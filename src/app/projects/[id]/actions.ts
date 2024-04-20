'use server';

import {
  addDoc,
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  updateDoc,
} from 'firebase/firestore';
import { revalidatePath } from 'next/cache';

import db from '@/firebase/db';
import type { Item } from '@/types';

export async function addCategory(projectId: string, name: string) {
  await addDoc(collection(db, 'projects', projectId, 'categories'), {
    name,
  });
  revalidatePath('/projects');
}

export async function deleteCategory(projectId: string, categoryId: string) {
  await deleteDoc(doc(db, 'projects', projectId, 'categories', categoryId));
  revalidatePath('/projects');
}

export async function editCategory(
  projectId: string,
  categoryId: string,
  name: string,
) {
  await updateDoc(doc(db, 'projects', projectId, 'categories', categoryId), {
    name: name,
  });
  revalidatePath('/projects');
}

export async function addItem(
  projectId: string,
  item: Item,
  planIds: string[],
) {
  const newItem = await addDoc(collection(db, 'projects', projectId, 'items'), {
    ...item,
  });

  await Promise.all(
    planIds.map((id) =>
      updateDoc(doc(db, 'projects', projectId, 'plans', id), {
        items: arrayUnion(newItem.id),
      }),
    ),
  );

  revalidatePath('/projects');
}

export async function saveItem(projectId: string, id: string, item: Item) {
  await updateDoc(doc(db, 'projects', projectId, 'items', id), {
    ...item,
  });
  revalidatePath('/projects');
}

// TODO: need to create Cloud Function to the item in all plans
export async function deleteItem(projectId: string, itemId: string) {
  await deleteDoc(doc(db, 'projects', projectId, 'items', itemId));
  revalidatePath('/projects');
}
