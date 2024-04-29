import { getCookie } from 'cookies-next';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { USER_EMAIL_COOKIE_NAME } from '@/constants';

import AddItemButton from './AddItemButton';
import ItemTable from './ItemTable';

// Force dynamic to be able to use cookies
export const dynamic = 'force-dynamic';

export default async function Project({ params }: { params: { id: string } }) {
  const userEmail = getCookie(USER_EMAIL_COOKIE_NAME, { cookies });
  if (!userEmail) redirect('/');

  return (
    <div className="relative">
      <ItemTable />
      <AddItemButton className="absolute right-0 top-0" />
    </div>
  );
}
