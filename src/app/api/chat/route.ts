'use server';

import { OpenAIStream, StreamingTextResponse } from 'ai';
import { collection, doc, getDocs } from 'firebase/firestore';
import { NextRequest } from 'next/server';
import { ChatCompletionMessage } from 'openai/resources/index.mjs';

import {
  fetchProjectInfo,
  fetchProjectItemsAndCategories,
  fetchProjectPlans,
} from '@/app/projects/[id]/fetch';
import db from '@/firebase/db';
import openai from '@/lib/openai';
import { Category, Item } from '@/types';

export async function POST(req: Request) {
  const body = await req.json();
  // console.log(req)
  console.log('body:', body);
  const projectId = body.projectId;

  const messages: ChatCompletionMessage[] = body.messages;

  const messagesTruncated = messages.slice(-6);

  const relevantProjects = await fetchProjectInfo(projectId);

  const relevantPlans = await fetchProjectPlans(projectId);

  const relevantItems = await fetchProjectItemsAndCategories(projectId);

  // edit in here
  const systemMessage: ChatCompletionMessage = {
    role: 'assistant',
    content:
      "You are an intelligent budget-planner app. You answer the user's question based on their existing items. " +
      'The relevant items for this query are:\n' +
      `Name:${relevantProjects.name}` +
      relevantPlans.map((plan) => `Name:${plan.name}`).join('\n\n') +
      relevantItems.items
        .map(
          (item) =>
            `Name: ${item.name}\n\ndescription:\n${item.description}\n\ncateogry:\n${item.category}\n\nprice:\n${item.price}\n\nquantity:\n${item.quantity}`,
        )
        .join('\n\n'),
  };
  relevantPlans.map((plan) => `Name:${plan.name}`);
  relevantItems.items.map(
    (item) =>
      `Name: ${item.name}\n\ndescription:\n${item.description}\n\ncateogry:\n${item.category}\n\nprice:\n${item.price}\n\nquantity:\n${item.quantity}`,
  );
  console.log('plan', relevantPlans);

  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    stream: true,
    messages: [systemMessage, ...messagesTruncated],
  });

  const stream = OpenAIStream(response);
  return new StreamingTextResponse(stream);
}
