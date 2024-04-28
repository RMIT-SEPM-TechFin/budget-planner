import { ArrowLeftRight, User, UserPlus } from 'lucide-react';
import { ReactNode } from 'react';

import ActionIconButton from '@/components/ActionIconButton';
import { Button } from '@/components/ui/button';

import { ProjectContextProvider } from './context';
import ExportDataButton from './ExportDataButton';
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
              <ViewChartButton projectName={name} items={items} plans={plans} />
              {/* <ActionIconButton
                Icon={ArrowLeftRight}
                tooltip="Compare Plans"
                onClick={() => {}}
              />
              <ActionIconButton
                Icon={UserPlus}
                tooltip="Invite Members"
                onClick={() => {}}
              /> */}
            </div>
          </div>
        </div>

        <div className="relative">{children}</div>
      </div>
    </ProjectContextProvider>
  );
}
