import {
  collection,
  getDocs,
  query,
  Timestamp,
  where,
} from 'firebase/firestore';

import db from '@/firebase/db';
import type { Project } from '@/types';

export default async function fetchProjectData(userEmail: string) {
  const q = query(
    collection(db, 'projects'),
    where('members', 'array-contains', userEmail),
  );

  const projects = await getDocs(q).then((snapshot) => {
    // using "as <Type>"" is not ideal, type validation should be done (ex: using zod)
    return snapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        ...data,
        id: doc.id,
        // replace Firestore Timestamp with Date
        createdAt: (data.createdAt as Timestamp).toDate(),
      } as Project;
    });
  });

  return projects;
}
