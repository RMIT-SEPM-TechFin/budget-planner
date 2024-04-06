import { FC, ReactNode } from 'react';

import NavBar from '@/components/NavBar';
import { Toaster } from '@/components/ui/toaster';

import Footer from './Footer';

const Layout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <>
      <div>
        <NavBar />
        {children}

        <Footer />
      </div>
      <Toaster />
    </>
  );
};

export default Layout;
