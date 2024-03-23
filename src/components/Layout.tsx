"use client";

import { FC, ReactNode } from "react";

import { Toaster } from "@/components/ui/toaster";
import NavBar from "@/components/NavBar";

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
