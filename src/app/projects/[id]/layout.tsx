import { ReactNode } from 'react';

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
        <div className="flex justify-between">
          <h1>{name}</h1>
        </div>
        <div className="relative">{children}</div>
      </div>
    </ProjectContextProvider>
  );
}
