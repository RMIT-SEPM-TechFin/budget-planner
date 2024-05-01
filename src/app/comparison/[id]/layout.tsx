import Link from 'next/link';
import { ReactNode } from 'react';

import { Button } from '@/components/ui/button';

import { ProjectContextProvider } from '../../projects/[id]/context';
import {
  fetchProjectItemsAndCategories,
  fetchProjectName,
  fetchProjectPlans,
} from '../../projects/[id]/fetch';

export default async function Layout({
  params,
  children,
}: {
  params: { id: string };
  children: ReactNode;
}) {
  const { id } = params;

  const [name, plans, { items, categories }] = await Promise.all([
    fetchProjectName(id),
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
        <div className='flex flex-col items-center gap-3'>
          <h1>{name}</h1>
          <Link
            href={`/projects/${id}`}
          >
            <Button variant="secondary">Back to Project Page</Button>
          </Link>
        </div>
        <div className="relative">{children}</div>
      </div>
    </ProjectContextProvider>
  );
}
