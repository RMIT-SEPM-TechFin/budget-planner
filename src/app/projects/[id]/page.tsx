import { getCookie } from 'cookies-next';
import { cookies } from 'next/headers';
import Link from 'next/link';
import { redirect } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { USER_EMAIL_COOKIE_NAME } from '@/constants';

import AddItemButton from './AddItemButton';
import BreadcrumbProject from './BreadcrumbsProject';
import ExportDataButton from './ExportDataButton';
import ItemTable from './ItemTable';
import ManageMembersButton from './ManageMembersButton';
import SelectPlanToDisplay from './SelectPlanToDisplay';
import ViewChartButton from './ViewChartButton';
import AIChatButton from './AIChatButton';

// Force dynamic to be able to use cookies
export const dynamic = 'force-dynamic';

export default async function Project({ params }: { params: { id: string } }) {
  const { id } = params;

  const userEmail = getCookie(USER_EMAIL_COOKIE_NAME, { cookies });
  if (!userEmail) redirect('/');

  return (
    <div className="relative">
      <div className="flex-col justify-between items-center flex gap-2 mb-5">
        <div className="w-full flex items-center justify-between mb-2">
          <BreadcrumbProject />
          <div className="justify-between items-center flex gap-2">
            <ExportDataButton />
            <ViewChartButton />
            <ManageMembersButton />
            <AIChatButton/>
            <Link href={`/projects/${id}/comparison`}>
              <Button
                className="bg-white border-[1px] border-[#e4e4e7]"
                variant="secondary"
              >
                Compare
              </Button>
            </Link>
          </div>
        </div>
        <div className="w-full flex justify-between gap-2">
          <SelectPlanToDisplay classname="w-max" />
          <AddItemButton />
        </div>
      </div>
      <ItemTable />
    </div>
  );
}