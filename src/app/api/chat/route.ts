'use server';

import { OpenAIStream, StreamingTextResponse } from 'ai';
import { ChatCompletionMessage } from 'openai/resources/index.mjs';

import openai from '@/lib/openai';
import type { Category, Item, Plan } from '@/types';

export async function POST(req: Request) {
  const body = await req.json();

  const { categories, items, plans, name } = body as {
    categories: Category[];
    items: Item[];
    plans: Plan[];
    name: string;
  };

  const messages: ChatCompletionMessage[] = body.messages;

  const messagesTruncated = messages.slice(-6);

  const itemsContent = items
    .map(
      (item) =>
        `Item ${item.name} with description ${item.description} in category ${categories.find((category) => category.id == item.category)?.name} with price of ${item.price} and quantity of ${item.quantity}, total price of ${item.price * item.quantity}.`,
    )
    .join('\n');

  const plansContent = plans
    .map(
      (plan) =>
        `Plan ${plan.name} have these following items: ${plan.items.map((item) => `${items.find((itemInfo) => itemInfo.id == item)?.name}`).join(', ')}.`,
    )
    .join('\n');

  // edit in here
  const systemMessage: ChatCompletionMessage = {
    role: 'assistant',
    content:
      "You are an intelligent budget-planner app. You answer the user's question based on the information of the project user is working on. " +
      'These are the information about the project: \n' +
      `Project name: ${name} \n` +
      `In the project, it have categories for the items: ${categories.map((category) => category.name).join(', ')} \n` +
      `All of the items in the project are: \n` +
      `${itemsContent} \n` +
      `The plans in the project are: \n` +
      `${plansContent} \n`,
  };

  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    stream: true,
    messages: [systemMessage, ...messagesTruncated],
  });

  const stream = OpenAIStream(response);
  return new StreamingTextResponse(stream);
}
