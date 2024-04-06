import { getCookie } from 'cookies-next';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { USER_EMAIL } from '@/constants';

import AddProjectDialog from './AddProjectDialog';
import fetchProjectData from './fetch';
import ProjectTable from './ProjectTable';

// Force dynamic to be able to use cookies
export const dynamic = 'force-dynamic';

// Ensure the page always dynamically rendered
// Source: https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config#revalidate
export const revalidate = 0;

// BUG: When users log out, then log in with a different account, the previous account's projects are still shown
export default async function Dashboard() {
  const userEmail = getCookie(USER_EMAIL, { cookies });

  if (!userEmail) redirect('/');

  const projects = await fetchProjectData(userEmail);

  return (
    <div className="space-y-6">
      <h1>All Projects</h1>
      <div className="relative">
        <ProjectTable projects={projects} />
        <AddProjectDialog />
      </div>
    </div>
  );
}
