import Link from 'next/link';
import { ReactNode } from 'react';

import Breadcrumbs from '@/components/Breadcrumbs';
import { Button } from '@/components/ui/button';

import { ProjectContextProvider } from '../(project)/context';
import {
  fetchProjectInfo,
  fetchProjectItemsAndCategories,
  fetchProjectPlans,
} from '../(project)/fetch';

export default async function Layout({
  params,
  children,
}: {
  params: { id: string };
  children: ReactNode;
}) {
  const { id } = params;

  const [{ name, members }, plans, { items, categories }] = await Promise.all([
    fetchProjectInfo(id),
    fetchProjectPlans(id),
    fetchProjectItemsAndCategories(id),
  ]);

  return (
    <ProjectContextProvider
      projectId={id}
      categories={categories}
      items={items}
      plans={plans}
    >
      <div className="space-y-10">
        <Breadcrumbs
          items={[
            { label: 'Dashboard', href: '/dashboard' },
            { label: name, href: `/projects/${id}` },
            { label: 'Comparison' },
          ]}
        />
        <div className="flex justify-between">
          <h1>{name}</h1>
          <Link href={`/projects/${id}`}>
            <Button
              className="bg-white border-[1px] border-[#e4e4e7]"
              variant="secondary"
            >
              Back to Project Page
            </Button>
          </Link>
        </div>
        <div className="relative">{children}</div>
      </div>
    </ProjectContextProvider>
  );
}
