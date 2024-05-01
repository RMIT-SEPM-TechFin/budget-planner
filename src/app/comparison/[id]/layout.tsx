import { ReactNode } from 'react';

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
      <div className="space-y-6">
        <h1>{name}</h1>
        <div className="relative">{children}</div>
      </div>
    </ProjectContextProvider>
  );
}
