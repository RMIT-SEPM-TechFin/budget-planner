import { getCookie } from 'cookies-next';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { USER_EMAIL } from '@/constants';

import fetchProjectData from './fetch';

export const dynamic = 'force-dynamic';

export default async function Dashboard() {
  const userEmail = getCookie(USER_EMAIL, { cookies });

  if (!userEmail) redirect('/');

  const projects = await fetchProjectData(userEmail);
  console.log('projects :', projects);

  return (
    <div>
      <h1>Dashboard</h1>
    </div>
  );
}
