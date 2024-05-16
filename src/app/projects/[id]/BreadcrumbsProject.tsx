'use client';

import { usePathname } from 'next/navigation';
import { FC, useMemo } from 'react';

import Breadcrumbs from '@/components/Breadcrumbs';

import { useProject } from './context';

interface BreadcrumbProjectProps {
  projectId: string;
}

const BreadcrumbProject: FC<BreadcrumbProjectProps> = ({ projectId }) => {
  const pathname = usePathname();
  const { name } = useProject();

  const isComparisonPage = useMemo(
    () => pathname.includes('comparison'),
    [pathname],
  );

  return (
    <Breadcrumbs
      items={[
        { label: 'Dashboard', href: '/dashboard' },
        {
          label: name,
          href: isComparisonPage ? `/projects/${projectId}` : undefined,
        },
        ...(isComparisonPage
          ? [
              {
                label: 'Comparison',
              },
            ]
          : []),
      ]}
    />
  );
};

export default BreadcrumbProject;
