'use server';

import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  Timestamp,
} from 'firebase/firestore';
import { revalidatePath } from 'next/cache';

import db from '@/firebase/db';

export async function saveNewProject({
  name,
  members,
  ownerEmail,
  ownerName,
}: {
  name: string;
  members: string[];
  ownerEmail: string;
  ownerName: string;
}) {
  await addDoc(collection(db, 'projects'), {
    name,
    members,
    ownerEmail,
    ownerName,
    createdAt: Timestamp.now(),
  });
  revalidatePath('/dashboard');
}

export async function deleteProject(projectId: string) {
  await deleteDoc(doc(db, 'projects', projectId));
  revalidatePath('/dashboard');
}
