'use client';

import { FC } from 'react';

import { useProject } from './context';

const ProjectName: FC = () => {
  const { name } = useProject();

  return <h1>{name}</h1>;
};

export default ProjectName;
