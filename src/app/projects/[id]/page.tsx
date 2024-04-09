import { getCookie } from 'cookies-next';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { USER_EMAIL_COOKIE_NAME } from '@/constants';
import { Item } from '@/types';

import AddItemButton from './AddItemButton';
import fetchItemData from './fetch';
import ItemTable from './ItemTable';

// Force dynamic to be able to use cookies
export const dynamic = 'force-dynamic';

export default async function Project({ params }: { params: { id: string } }) {
  const data: Item[] = [
    {
      id: '1',
      category: 'Category 1',
      name: 'Item 1',
      description: 'Description 1',
      price: 10,
      quantity: 100,
    },
    {
      id: '2',
      category: 'Category 2',
      name: 'Item 2',
      description: 'Description 2',
      price: 20,
      quantity: 200,
    },
    {
      id: '3',
      category: 'Category 3',
      name: 'Item 3',
      description: 'Description 3',
      price: 30,
      quantity: 300,
    },
  ];
  const { id } = params;

  const userEmail = getCookie(USER_EMAIL_COOKIE_NAME, { cookies });
  if (!userEmail) redirect('/');
  console.log(userEmail);

  const categories = await fetchItemData(id, userEmail);
  console.log(categories);

  return (
    <div className="space-y-6">
      <h1>All Projects</h1>
      <div className="relative">
        <ItemTable items={data} />
        <AddItemButton className="absolute right-0 top-0" />
      </div>
    </div>
  );
}
