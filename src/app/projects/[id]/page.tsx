import { getCookie } from 'cookies-next';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { USER_EMAIL_COOKIE_NAME } from '@/constants';
import { ProjectContextProvider } from '@/context/ProjectContext';

import AddItemButton from './AddItemButton';
import { fetchProjectItemsAndCategories } from './fetch';
import ItemTable from './ItemTable';

// Force dynamic to be able to use cookies
export const dynamic = 'force-dynamic';

export default async function Project({ params }: { params: { id: string } }) {
  const { id } = params;

  const userEmail = getCookie(USER_EMAIL_COOKIE_NAME, { cookies });
  if (!userEmail) redirect('/');

  const { items, categories } = await fetchProjectItemsAndCategories(id);

  return (
    <ProjectContextProvider projectId={id} categories={categories}>
      <div className="relative">
        <ItemTable items={items} />
        <AddItemButton className="absolute right-0 top-0" />
      </div>
    </ProjectContextProvider>
  );
}
