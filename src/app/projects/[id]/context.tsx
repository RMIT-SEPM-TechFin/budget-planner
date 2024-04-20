'use client';

import { createContext, FC, PropsWithChildren, useContext } from 'react';

import type { Category, Item, Plan } from '@/types';

export const ProjectContext = createContext<ProjectContextType>({
  projectId: '',
  categories: [],
  items: [],
  plans: [],
} as ProjectContextType);

interface ProjectContextType {
  projectId: string;
  categories: Category[];
  items: Item[];
  plans: Plan[];
}

export const ProjectContextProvider: FC<
  PropsWithChildren<ProjectContextType>
> = ({ children, projectId, categories, items, plans }) => {
  return (
    <ProjectContext.Provider value={{ projectId, categories, items, plans }}>
      {children}
    </ProjectContext.Provider>
  );
};

export const useProject = () => {
  return useContext(ProjectContext);
};
