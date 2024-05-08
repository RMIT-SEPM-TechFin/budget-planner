import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { StringParam, useQueryParam } from 'use-query-params';

import db from '@/firebase/db';
import type { Chat } from '@/types';

export const usePlanIdQueryParam = () => {
  const [planId, setPlanId] = useQueryParam('planId', StringParam);

  return { planId, setPlanId };
};

export const useRealtimeChat = (projectId: string) => {
  const [chats, setChats] = useState<Chat[]>([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(
        collection(db, 'projects', projectId, 'chats'),
        orderBy('createdAt', 'asc'),
      ),
      (snapshot) => {
        setChats(
          snapshot.docs.map((doc) => {
            const data = doc.data();
            return {
              ...data,
              id: doc.id,
            } as Chat;
          }),
        );
      },
    );

    return () => {
      unsubscribe();
    };
  });

  return { chats };
};
