import { getCookie } from 'cookies-next';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { USER_EMAIL } from '@/constants';
import { cn } from '@/lib/utils';

import fetchProjectData from './fetch';

export const dynamic = 'force-dynamic';

export default async function Dashboard() {
  const userEmail = getCookie(USER_EMAIL, { cookies });

  if (!userEmail) redirect('/');

  const projects = await fetchProjectData(userEmail);
  console.log('projects :', projects);

  return (
    <div className={cn('w-full container md:px-10 pt-10 pb-5')}>Dashboard</div>
  );
}
