import { getCookie } from 'cookies-next';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { USER_EMAIL_COOKIE_NAME } from '@/constants';

import AddItemButton from './AddItemButton';
import AIChatButton from './AIChatButton';
import ConversationButton from './ConversationButton';
import ExportDataButton from './ExportDataButton';
import ItemTable from './ItemTable';
import ManageMembersButton from './ManageMembersButton';
import NavigateComparisonButton from './NavigateComparisonButton';
import ProjectName from './ProjectName';
import SelectPlanToDisplay from './SelectPlanToDisplay';
import ViewChartButton from './ViewChartButton';

// Force dynamic to be able to use cookies
export const dynamic = 'force-dynamic';

export default async function Project({ params }: { params: { id: string } }) {
  const { id } = params;

  const userEmail = getCookie(USER_EMAIL_COOKIE_NAME, { cookies });
  if (!userEmail) redirect('/');

  return (
    <div className="relative">
      <div className="flex flex-col justify-between items-center gap-2 mb-5">
        <div className="w-full flex items-center justify-between mb-2">
          <ProjectName />
          <div className="justify-between items-center flex gap-2">
            <ExportDataButton />
            <ViewChartButton />
            <NavigateComparisonButton projectId={id} />
            <ManageMembersButton />
            <ConversationButton projectId={id} />
            <AIChatButton />
          </div>
        </div>
        <div className="w-full flex justify-between gap-2">
          <SelectPlanToDisplay className="w-max" />
          <AddItemButton />
        </div>
      </div>
      <ItemTable />
    </div>
  );
}
