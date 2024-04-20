'use client';

import { createContext, ReactNode } from 'react';

import type { Category } from '@/types';

export const ProjectContext = createContext<ProjectContextType>({
  projectId: '',
} as ProjectContextType);

interface ProjectContextType {
  projectId: string;
  categories: Category[];
}

export const ProjectContextProvider = ({
  children,
  projectId,
  categories,
}: {
  children: ReactNode;
  projectId: string;
  categories: Category[];
}) => {
  return (
    <ProjectContext.Provider value={{ projectId, categories }}>
      {children}
    </ProjectContext.Provider>
  );
};
