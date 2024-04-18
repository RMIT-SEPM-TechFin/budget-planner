'use client';
import { createContext, ReactNode } from 'react';

export const ProjectContext = createContext<ProjectContextType>({
  projectId: '',
} as ProjectContextType);

interface ProjectContextType {
  projectId: string;
}

export const ProjectContextProvider = ({
  children,
  projectId,
}: {
  children: ReactNode;
  projectId: string;
}) => {
  return (
    <ProjectContext.Provider value={{ projectId }}>
      {children}
    </ProjectContext.Provider>
  );
};
