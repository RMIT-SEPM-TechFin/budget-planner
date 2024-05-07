import { ReactNode } from 'react';

import Breadcrumbs from '@/components/Breadcrumbs';

import AIChatButton from './AIChatButton';
import { ProjectContextProvider } from './context';
import ExportDataButton from './ExportDataButton';
import {
  fetchProjectInfo,
  fetchProjectItemsAndCategories,
  fetchProjectPlans,
} from './fetch';
import ManageMembersButton from './ManageMembersButton';
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

  const [{ name, members }, plans, { items, categories }] = await Promise.all([
    fetchProjectInfo(id),
    fetchProjectPlans(id),
    fetchProjectItemsAndCategories(id),
  ]);
  console.log(id);
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
              <ViewChartButton
                projectName={name}
                items={items}
                plans={plans}
                categories={categories}
              />
              <ManageMembersButton projectId={id} initialMembers={members} />
              <AIChatButton projectId={id} />
            </div>
          </div>
        </div>

        <div className="relative">{children}</div>
      </div>
    </ProjectContextProvider>
  );
}
