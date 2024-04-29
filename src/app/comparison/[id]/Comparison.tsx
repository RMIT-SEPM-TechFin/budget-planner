'use client'

import { getCookie } from 'cookies-next';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { FC, useEffect, useMemo, useState } from 'react';

import { useProject } from '@/app/projects/[id]/context';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectSeparator, SelectTrigger, SelectValue } from '@/components/ui/select';
import { USER_EMAIL_COOKIE_NAME } from '@/constants';
import { Category, Item, Plan } from '@/types';

import { fetchProjectItemsAndCategories, fetchProjectName, fetchProjectPlans } from '../../projects/[id]/fetch';
import ItemTable from '../../projects/[id]/ItemTable';
import ScrollArea from './ScrollArea';
import ScrollAreaHorizontalDemo from './ScrollArea';
import { usePlanIdLocal } from './useLocalId';

// Force dynamic to be able to use cookies
export const dynamic = 'force-dynamic';

interface ProjectData {
  name: string;
  plans: Plan[];
  items: Item[];
  categories: Category[];
}

const Comparison: FC<{ params: { id: string } }> = ({ params }) => {
  const { id } = params;

  const { planId, setPlanId } = usePlanIdLocal();
  const { planId: planId2, setPlanId: setPlanId2 } = usePlanIdLocal();
  const { projectId, categories, items, plans } = useProject();

  const [data, setData] = useState<ProjectData>({
    name: '',
    plans: [],
    items: [],
    categories: [],
  });

  useEffect(() => {
    async function fetchData() {
      const [name, plans, { items, categories }] = await Promise.all([
        fetchProjectName(id),
        fetchProjectPlans(id),
        fetchProjectItemsAndCategories(id),
      ]);
      setData({ name, plans, items, categories });
    }

    fetchData().catch(console.error);
  }, [id]); // Dependency array to refetch when id changes

  const filteredItems1 = useMemo(() => {
    const filteredItemIds =
      typeof planId === 'string'
        ? plans.find((plan) => plan.id === planId)?.items
        : undefined;
  
    if (filteredItemIds === undefined) return items;
  
    console.log('Filtered Item 1 IDs:', filteredItemIds);
  
    return items.filter((item) => filteredItemIds.includes(item.id));
  }, [planId, plans, items]);

  const filteredItems2 = useMemo(() => {
    const filteredItemIds2 =
      typeof planId2 === 'string'
        ? plans.find((plan) => plan.id === planId2)?.items
        : undefined;
  
    if (filteredItemIds2 === undefined) return items;
  
    console.log('Filtered Item 2 IDs:', filteredItemIds2);
  
    return items.filter((item) => filteredItemIds2.includes(item.id));
  }, [planId2, plans, items]);

  // compare the two items
  // const compareItems = () => {
  //   const item1 = filteredItems1;
  //   const item2 = filteredItems2;
  //   const result = item1.map((item) => {
  //     const item2 = item2.find((item2) => item2.id === item.id);
  //     return {
  //       ...item,
  //       item2,
  //     };
  //   });
  //   console.log('Result:', result);
  //   return result;
  // };
  

  return (
    <div className="relative flex gap-2">
      <div className='flex flex-col gap-2'>
        <Select
          onValueChange={(value) => {
            console.log('New plan selected:', value); // Debug: Check if this logs correctly
            setPlanId(value === 'all' ? undefined : value);
          }}
          value={planId ?? 'all'}
        >
          <SelectTrigger className="w-max">
            <SelectValue placeholder="Select a plan" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Items</SelectItem>
            <SelectSeparator />
            <SelectGroup>
              <div className="relative">
                <SelectLabel>Plans</SelectLabel>
              </div>
              <div className="relative">
                {data.plans.map((plan) => {
                  return (
                    <div className="relative z-0" key={plan.id}>
                      <SelectItem value={plan.id}>{plan.name}</SelectItem>
                    </div>
                  );
                })}
              </div>
              {data.plans.length === 0 && 'No plans available'}
            </SelectGroup>
          </SelectContent>
        </Select>
        <ScrollAreaHorizontalDemo planId={planId} filteredItems={filteredItems1} categories={categories}/>
      </div>
      <div className='flex flex-col gap-2'>
        <Select
          onValueChange={(value) => {
            console.log('New plan selected:', value); // Debug: Check if this logs correctly
            setPlanId2(value === 'all' ? undefined : value);
          }}
          value={planId2 ?? 'all'}
        >
          <SelectTrigger className="w-max">
            <SelectValue placeholder="Select a plan" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Items</SelectItem>
            <SelectSeparator />
            <SelectGroup>
              <div className="relative">
                <SelectLabel>Plans</SelectLabel>
              </div>
              <div className="relative">
                {data.plans.map((plan) => {
                  return (
                    <div className="relative z-0" key={plan.id}>
                      <SelectItem value={plan.id}>{plan.name}</SelectItem>
                    </div>
                  );
                })}
              </div>
              {data.plans.length === 0 && 'No plans available'}
            </SelectGroup>
          </SelectContent>
        </Select>
        <ScrollAreaHorizontalDemo planId={planId2} filteredItems={filteredItems2} categories={categories}/>
      </div>
    </div>
  );
}

export default Comparison;
