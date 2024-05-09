'use server';

import { OpenAIStream, StreamingTextResponse } from 'ai';
import { ChatCompletionMessage } from 'openai/resources/index.mjs';

import {
  fetchItemForAI,
  fetchProjectInfo,
  fetchProjectPlans,
} from '@/app/projects/[id]/fetch';
import openai from '@/lib/openai';
import { Item, Plan } from '@/types';

export async function POST(req: Request) {
  const body = await req.json();
  // console.log(req)
  console.log('body:', body);
  const projectId = body.projectId;

  const messages: ChatCompletionMessage[] = body.messages;

  const messagesTruncated = messages.slice(-6);

  const relevantProjects = await fetchProjectInfo(projectId);

  const relevantPlans = await fetchProjectPlans(projectId);

  const relevantItems = await fetchItemForAI(projectId);

  function mapPlansWithItemDetails(plans: Plan[], items: Item[]): Plan[] {
    const itemMap = items.reduce(
      (acc, item) => {
        acc[item.id] = item.name; // or item if you want the whole object
        return acc;
      },
      {} as { [key: string]: string },
    );

    return plans.map((plan) => ({
      ...plan,
      items: plan.items.map((itemId) => itemMap[itemId] ?? 'Item not found'),
    }));
  }
  const mappedPlans = mapPlansWithItemDetails(
    relevantPlans,
    relevantItems.items,
  );
  console.log('mappedPlans', mappedPlans);

  // edit in here
  const systemMessage: ChatCompletionMessage = {
    role: 'assistant',
    content:
      "You are an intelligent budget-planner app. You answer the user's question based on their existing items. " +
      'The relevant items for this query are:\n' +
      `Name:${relevantProjects.name}` +
      mappedPlans
        .map((plan) => `Name:${plan.name}\n\nitems:${plan.items}`)
        .join('\n\n') +
      relevantItems.items
        .map(
          (item) =>
            `Name: ${item.name}\n\ndescription:\n${item.description}\n\ncateogry:\n${item.category}\n\nprice:\n${item.price}\n\nquantity:\n${item.quantity}`,
        )
        .join('\n\n'),
  };

  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    stream: true,
    messages: [systemMessage, ...messagesTruncated],
  });

  const stream = OpenAIStream(response);
  return new StreamingTextResponse(stream);
}
