'use client';

import { useContext } from 'react';

import { UIContext } from '@/context/UIContext';

const useNotification = () => {
  return useContext(UIContext);
};

export default useNotification;
