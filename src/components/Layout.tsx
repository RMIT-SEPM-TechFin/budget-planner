import { FC, ReactNode } from 'react';

import NavBar from '@/components/NavBar';
import { Toaster } from '@/components/ui/toaster';

import Footer from './Footer';

const Layout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <>
      <div>
        <NavBar />
        <div className="p-10 flex items-center justify-center">
          <div className="flex-1 max-w-[1200px] min-h-screen">{children}</div>
        </div>
        <Footer />
      </div>
      <Toaster />
    </>
  );
};

export default Layout;
