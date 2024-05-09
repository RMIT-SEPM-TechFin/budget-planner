'use client';

import { createContext, FC, PropsWithChildren, useContext } from 'react';

import type { Category, Item, Plan } from '@/types';

interface ProjectContextType {
  projectId: string;
  categories: Category[];
  items: Item[];
  plans: Plan[];
  name: string;
  members: string[];
}

export const ProjectContext = createContext<ProjectContextType>({
  projectId: '',
  categories: [],
  items: [],
  plans: [],
  name: '',
  members: [],
} as ProjectContextType);

export const ProjectContextProvider: FC<
  PropsWithChildren<ProjectContextType>
> = ({ children, projectId, categories, items, plans, name, members }) => {
  return (
    <ProjectContext.Provider
      value={{ projectId, categories, items, plans, name, members }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

export const useProject = () => {
  return useContext(ProjectContext);
};
