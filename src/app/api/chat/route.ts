'use server';

import { OpenAIStream, StreamingTextResponse } from 'ai';
import { collection, doc, getDocs } from 'firebase/firestore';
import { NextRequest } from 'next/server';
import { ChatCompletionMessage } from 'openai/resources/index.mjs';

import db from '@/firebase/db';
import openai from '@/lib/openai';
import { Category, Item } from '@/types';

export async function POST(req: Request) {
  const body = await req.json();
  console.log('body:', body);
  // const projectId = body.key;
  // const { searchParams } = new URL(req.url)
  // console.log('searchParams',searchParams)
  // const projectId = searchParams.get('id')

  const projectId = 'KXvSYnxxqaBhdomyzX6d';

  const messages: ChatCompletionMessage[] = body.messages;

  const messagesTruncated = messages.slice(-6);

  const relevantItems = await fetchProjectItemsAndCategories(projectId);

  const systemMessage: ChatCompletionMessage = {
    role: 'assistant',
    content:
      "You are an intelligent budget-planner app. You answer the user's question based on their existing items. " +
      'The relevant items for this query are:\n' +
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

async function fetchProjectItemsAndCategories(projectId: string) {
  // Reference to the project document
  const projectRef = doc(db, 'projects', projectId);

  // Reference to the items subcollection within the project document
  const itemsRef = collection(projectRef, 'items');

  const categoryRef = collection(projectRef, 'categories');

  const categories = await getDocs(categoryRef).then((snapshot) => {
    return snapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        ...data,
        id: doc.id,
      } as Category;
    });
  });

  const items = await getDocs(itemsRef).then((snapshot) => {
    return snapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        ...data,
        id: doc.id,
        category:
          categories.find((category) => category.id === data.category)?.id ??
          'Unknown',
      } as Item;
    });
  });
  return { items, categories };
}
