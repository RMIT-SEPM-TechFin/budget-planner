import { collection, doc, getDoc, getDocs } from 'firebase/firestore';

import db from '@/firebase/db';
import type { Category, Item, Plan, Project } from '@/types';

export async function fetchProjectInfo(projectId: string) {
  const projectRef = doc(db, 'projects', projectId);

  const project = (await getDoc(projectRef)).data();
  if (!project) {
    throw new Error('Project not found');
  }

  return {
    ...project,
    id: projectId,
  } as Project;
}

export async function fetchProjectPlans(projectId: string) {
  const projectRef = doc(db, 'projects', projectId);

  const plansRef = collection(projectRef, 'plans');

  const plans = await getDocs(plansRef).then((snapshot) => {
    return snapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        ...data,
        id: doc.id,
      } as Plan;
    });
  });
console.log('plans',plans)
  return plans;
}

export async function fetchProjectItemsAndCategories(projectId: string) {
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

export async function fetchItemForAI(projectId: string) {
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
    const categoryMap: { [categoryId: string]: string } = {};
    categories.forEach((category) => {
      categoryMap[category.id] = category.name;
    });
  
    return snapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        ...data,
        id: doc.id,
        category:
        categoryMap[data.category] ?? 'Unknown',
      } as Item;
    });
  });
  console.log('items',items)
  return { items, categories };
}

