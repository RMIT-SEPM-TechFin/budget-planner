import { collection, doc, getDoc, getDocs } from 'firebase/firestore';

import db from '@/firebase/db';
import { Category, Item } from '@/types';

export default async function fetchItemData(projectId: string) {
  // Reference to the project document
  const projectRef = doc(db, 'projects', projectId);

  const project = (await getDoc(projectRef)).data();
  if (!project) {
    throw new Error('Project not found');
  }
  const name = project.name;

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
          categories.find((category) => category.id === data.category)?.id ||
          'Unknown',
      } as Item;
    });
  });
  return { name, items, categories };
}
