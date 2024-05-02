import Link from 'next/link';
import { ReactNode } from 'react';

import { Button } from '@/components/ui/button';

import { ProjectContextProvider } from './context';
import {
  fetchProjectItemsAndCategories,
  fetchProjectName,
  fetchProjectPlans,
} from './fetch';
import SelectPlanToDisplay from './SelectPlanToDisplay';

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
      <div className="space-y-6">
        <h1>{name}</h1>
        <div className="justify-between items-center flex gap-5">
          {/* TODO: add breadcrumb */}

          <div className="w-full flex items-center justify-between">
              <SelectPlanToDisplay classname='w-max' plans={plans} />

            <div className="justify-between items-center flex gap-2">
              <Button variant="secondary">View Chart</Button>
              <Link
                href={`/projects/${id}/comparison`}
              >
                <Button variant="secondary">Compare</Button>
              </Link>
            </div>
          </div>
        </div>
        <div className="relative">{children}</div>
      </div>
    </ProjectContextProvider>
  );
}
