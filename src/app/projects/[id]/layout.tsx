import { MessageCircle } from 'lucide-react';
import { ReactNode } from 'react';

import { Button } from '@/components/ui/button';

import { ProjectContextProvider } from './context';
import ExportData from './ExportData';
import {
  fetchProjectItemsAndCategories,
  fetchProjectName,
  fetchProjectPlans,
} from './fetch';
import SelectPlanToDisplay from './SelectPlanToDisplay';
import ViewChartButton from './ViewChartButton';

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
      <div className="space-y-4">
        <div className="flex justify-between">
          <h1>{name}</h1>
          <div className="flex justify-between items-center gap-2">
            <ExportData categories={categories} data={items} plans={plans} />
            <Button variant={'ghost'}>
              <MessageCircle />
            </Button>
            <Button>Invite</Button>
          </div>
        </div>
        <div className="justify-between items-center flex gap-5">
          {/* TODO: add breadcrumb */}

          <div className="w-full flex items-center justify-between">
            <SelectPlanToDisplay plans={plans} />

            <div className="justify-between items-center flex gap-2">
              <ViewChartButton projectName={name} data={items} />
              <Button variant="secondary">Compare</Button>
            </div>
          </div>
        </div>

        <div className="relative">{children}</div>
      </div>
    </ProjectContextProvider>
  );
}
