'use server';

import {
  addDoc,
  arrayRemove,
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

export async function saveItem(
  projectId: string,
  id: string,
  item: Item,
  initialPlanIds: string[],
  updatedPlanIds: string[],
) {
  const removeItemPlanIds = initialPlanIds.filter(
    (id) => !updatedPlanIds.includes(id),
  );

  const addItemPlanIds = updatedPlanIds.filter(
    (id) => !initialPlanIds.includes(id),
  );

  await Promise.all([
    updateDoc(doc(db, 'projects', projectId, 'items', id), {
      ...item,
    }),
    ...removeItemPlanIds.map((planId) =>
      updateDoc(doc(db, 'projects', projectId, 'plans', planId), {
        items: arrayRemove(id),
      }),
    ),
    ...addItemPlanIds.map((planId) =>
      updateDoc(doc(db, 'projects', projectId, 'plans', planId), {
        items: arrayUnion(id),
      }),
    ),
  ]);

  revalidatePath('/projects');
}

export async function deleteItem(
  projectId: string,
  itemId: string,
  planIdsContainItem: string[],
) {
  await Promise.all([
    deleteDoc(doc(db, 'projects', projectId, 'items', itemId)),
    ...planIdsContainItem.map((id) =>
      updateDoc(doc(db, 'projects', projectId, 'plans', id), {
        items: arrayRemove(itemId),
      }),
    ),
  ]);

  revalidatePath('/projects');
}
