import { getCookie } from 'cookies-next';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { USER_EMAIL_COOKIE_NAME } from '@/constants';
import { ProjectContextProvider } from '@/context/ProjectContext';

import AddItemButton from './AddItemButton';
import fetchItemData from './fetch';
import ItemTable from './ItemTable';
import ViewChartButton from './ViewChartButton';

// Force dynamic to be able to use cookies
export const dynamic = 'force-dynamic';

export default async function Project({ params }: { params: { id: string } }) {
  const { id } = params;

  const userEmail = getCookie(USER_EMAIL_COOKIE_NAME, { cookies });
  if (!userEmail) redirect('/');

  const { name, items, categories } = await fetchItemData(id);

  return (
    <div className="space-y-6">
      <h1>{name}</h1>
      <div className="relative">
        <ProjectContextProvider projectId={id}>
          <ItemTable items={items} categories={categories} />
          <AddItemButton
            categories={categories}
            className="absolute right-0 top-0"
          />
          <ViewChartButton className="absolute right-[7rem] top-0" data={data}/>
        </ProjectContextProvider>
      </div>
    </div>
  );
}
