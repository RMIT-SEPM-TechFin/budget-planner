import { getCookie } from 'cookies-next';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { stringify } from 'querystring';

import fetchProjectData from '@/app/dashboard/fetch';
import { USER_EMAIL_COOKIE_NAME } from '@/constants';
import { Item } from '@/types';

import AddItemButton from './AddItemButton';
import fetchItemData from './fetch';
import ItemTable from './ItemTable';

// Force dynamic to be able to use cookies
export const dynamic = 'force-dynamic';

export default async function Project({ params }: { params: { id: string } }) {
  const { id } = params;

  const userEmail = getCookie(USER_EMAIL_COOKIE_NAME, { cookies });
  if (!userEmail) redirect('/');

  const items = await fetchItemData(id);

  const projects = await fetchProjectData(userEmail);

  // named project by projectId
  const project = projects.find((project) => project.id === id);
  const projectName = project ? project.name : 'No Projects Found';

  return (
    <div className="space-y-6">
      <h1>{projectName}</h1>
      <div className="relative">
        <ItemTable projectId={id} items={items} />
        <AddItemButton projectId={id} className="absolute right-0 top-0" />
      </div>
    </div>
  );
}
