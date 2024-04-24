'use client';

import NextAdapterApp from 'next-query-params/app';
import { FC, PropsWithChildren } from 'react';
import { QueryParamProvider } from 'use-query-params';

import { AuthContextProvider } from '@/context/AuthContext';
import { UIContextProvider } from '@/context/UIContext';

const Providers: FC<PropsWithChildren> = ({ children }) => (
  <QueryParamProvider adapter={NextAdapterApp}>
    <UIContextProvider>
      <AuthContextProvider>{children}</AuthContextProvider>
    </UIContextProvider>
  </QueryParamProvider>
);

export default Providers;
