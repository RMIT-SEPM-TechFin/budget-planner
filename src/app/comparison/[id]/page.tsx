import { getCookie } from 'cookies-next';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { USER_EMAIL_COOKIE_NAME } from '@/constants';

import { fetchProjectItemsAndCategories } from '../../projects/[id]/fetch';
import ItemTable from '../../projects/[id]/ItemTable';
import ScrollArea from './ScrollArea';
import ScrollAreaHorizontalDemo from './ScrollArea';

// Force dynamic to be able to use cookies
export const dynamic = 'force-dynamic';

export default async function Project({ params }: { params: { id: string } }) {
  const { id } = params;

  const userEmail = getCookie(USER_EMAIL_COOKIE_NAME, { cookies });
  if (!userEmail) redirect('/');

  return (
    <div className="relative flex gap-2">
      <ScrollAreaHorizontalDemo params={params} />
      <ScrollAreaHorizontalDemo params={params} />
    </div>
  );
}
