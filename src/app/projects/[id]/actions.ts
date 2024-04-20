'use server';

import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  updateDoc,
} from 'firebase/firestore';
import { revalidatePath } from 'next/cache';

import db from '@/firebase/db';
import { Item } from '@/types';

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

export async function addItem(projectId: string, item: Item) {
  await addDoc(collection(db, 'projects', projectId, 'items'), {
    ...item,
  });
  revalidatePath('/projects');
}

export async function saveItem(projectId: string, item: Item, id: string) {
  await updateDoc(doc(db, 'projects', projectId, 'items', id), {
    ...item,
  });
  revalidatePath('/projects');
}

export async function deleteItem(projectId: string, itemId: string) {
  await deleteDoc(doc(db, 'projects', projectId, 'items', itemId));
  revalidatePath('/projects');
}
