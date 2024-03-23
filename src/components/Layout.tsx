'use client';

import { FC, ReactNode } from 'react';

import NavBar from '@/components/NavBar';
import { Toaster } from '@/components/ui/toaster';

const Layout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <>
      <div>
        <NavBar />
        {children}
      </div>
      <Toaster />
    </>
  );
};

export default Layout;
