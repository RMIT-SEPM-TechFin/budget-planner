import { ReactNode } from 'react';

import { Button } from '@/components/ui/button';

import { fetchProjectName } from './fetch';

export default async function Layout({
  params,
  children,
}: {
  params: { id: string };
  children: ReactNode;
}) {
  const { id } = params;
  const name = await fetchProjectName(id);

  return (
    <div className="space-y-6">
      <h1>{name}</h1>
      <div className="justify-between items-center flex gap-5">
        {/* TODO: add breadcrumb */}

        <div className="w-full flex items-center justify-between">
          {/* Tabs */}
          <div>Plans</div>

          <div className="justify-between items-center flex gap-2">
            <Button variant="secondary">View Chart</Button>
            <Button variant="secondary">Compare</Button>
          </div>
        </div>
      </div>

      <div className="relative">{children}</div>
    </div>
  );
}
