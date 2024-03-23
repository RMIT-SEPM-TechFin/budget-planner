'use client';

import { createContext, ReactNode } from 'react';

import { ToastActionElement, ToastProps } from '@/components/ui/toast';
import { Toaster } from '@/components/ui/toaster';
import { useToast } from '@/components/ui/use-toast';

type Notification = ToastProps & {
  title?: ReactNode;
  description?: ReactNode;
  action?: ToastActionElement;
};

type UIContextType = {
  showNotification: (notificationDetails: Notification) => void;
};

export const UIContext = createContext<UIContextType>({
  showNotification: () => {},
});

export const UIContextProvider = ({ children }: { children: ReactNode }) => {
  // TODO: update toast styling for success and error
  const { toast } = useToast();

  const showNotification = (notificationDetails: Notification) => {
    toast(notificationDetails);
  };

  return (
    <UIContext.Provider value={{ showNotification }}>
      {children}
      <Toaster />
    </UIContext.Provider>
  );
};
