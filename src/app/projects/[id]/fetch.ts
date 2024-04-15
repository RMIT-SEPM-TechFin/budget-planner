import {
  collection,
  doc,
  documentId,
  FieldValue,
  getDocs,
  orderBy,
  query,
  where,
} from 'firebase/firestore';

import db from '@/firebase/db';
import { Item } from '@/types';

export default async function fetchItemData(projectId: string) {
  // Reference to the project document
  const projectRef = doc(db, 'projects', projectId);
  //   // Reference to the items subcollection within the project document
  const itemsRef = collection(projectRef, 'items');

  const items = await getDocs(itemsRef).then((snapshot) => {
    return snapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        ...data,
        id: doc.id,
      } as Item;
    });
  });
  return items;
}
