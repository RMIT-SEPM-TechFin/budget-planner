import Link from 'next/link';
import { ReactNode } from 'react';

import Breadcrumbs from '@/components/Breadcrumbs';
import { Button } from '@/components/ui/button';

import ExportDataButton from '../ExportDataButton';
import ManageMembersButton from '../ManageMembersButton';
import ViewChartButton from '../ViewChartButton';
import { ProjectContextProvider } from './context';
import {
  fetchProjectInfo,
  fetchProjectItemsAndCategories,
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
      <div className="space-y-4">
        <Breadcrumbs
          items={[{ label: 'Dashboard', href: '/dashboard' }, { label: name }]}
        />
        <div className="flex justify-between">
          <h1>{name}</h1>
        </div>
        <div className="justify-between items-center flex gap-5">
          {/* TODO: add breadcrumb */}

          <div className="w-full flex items-center justify-between">
            <div className="flex items-center gap-2">
              <SelectPlanToDisplay plans={plans} />
            </div>

            <div className="justify-between items-center flex gap-2">
              <ExportDataButton
                categories={categories}
                data={items}
                plans={plans}
              />
              <Link
                href={`/projects/${id}/comparison`}
              >
                <Button className='bg-white border-[1px] border-[#e4e4e7]' variant="secondary">Compare</Button>
              </Link>
              <ViewChartButton projectName={name} items={items} plans={plans} />
              <ManageMembersButton projectId={id} initialMembers={members} />
            </div>
          </div>
        </div>
        <div className="relative">{children}</div>
      </div>
    </ProjectContextProvider>
  );
}
