'use client';

import { FC } from 'react';

import Breadcrumbs from '@/components/Breadcrumbs';

import { useProject } from '../context';

const BreadcrumbComparison: FC<{}> = () => {
  const { projectId, name } = useProject();

  return (
    <Breadcrumbs
      items={[
        { label: 'Dashboard', href: '/dashboard' },
        { label: name, href: `/projects/${projectId}` },
        { label: 'Comparison' },
      ]}
    />
  );
};

export default BreadcrumbComparison;
