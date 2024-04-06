import { getCookie } from 'cookies-next';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { USER_EMAIL } from '@/constants';

import fetchProjectData from './fetch';
import ProjectTable from './ProjectTable';

// Force dynamic to be able to use cookies
export const dynamic = 'force-dynamic';

export default async function Dashboard() {
  const userEmail = getCookie(USER_EMAIL, { cookies });

  if (!userEmail) redirect('/');

  const projects = await fetchProjectData(userEmail);

  return (
    <div className="space-y-6">
      <h1>All Projects</h1>
      <ProjectTable projects={projects} />
    </div>
  );
}
