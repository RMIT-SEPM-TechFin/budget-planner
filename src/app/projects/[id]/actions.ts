'use server';

import { addDoc, collection, deleteDoc, doc } from 'firebase/firestore';
import { revalidatePath } from 'next/cache';

import db from '@/firebase/db';

export async function saveNewItem(
  projectId: string,
  {
    category,
    description,
    name,
    price,
    quantity,
  }: {
    category: string;
    description?: string;
    name: string;
    price: number;
    quantity: number;
  },
) {
  await addDoc(collection(db, 'projects', projectId, 'items'), {
    category,
    description,
    name,
    price,
    quantity,
  });
  revalidatePath('/projects');
}

export async function deleteItem(projectId: string, itemId: string) {
  // replace i0YRXACIJ2OQpiaPtyrt to projectId
  await deleteDoc(doc(db, 'projects', projectId, 'items', itemId));
  revalidatePath('/projects');
}
