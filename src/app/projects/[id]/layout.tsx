import { ReactNode } from 'react';

import BreadcrumbProject from './BreadcrumbsProject';
import { ProjectContextProvider } from './context';
import {
  fetchProjectInfo,
  fetchProjectItemsAndCategories,
  fetchProjectPlans,
} from './fetch';

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
      name={name}
      members={members}
    >
      <div className="space-y-4">
        <BreadcrumbProject projectId={id} />
        {children}
      </div>
    </ProjectContextProvider>
  );
}
