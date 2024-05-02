'use client'

import { FC, useEffect, useMemo, useState } from 'react';

import { useProject } from '@/app/projects/[id]/(project)/context';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectSeparator, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Category, ComparisonProps,Item, Plan } from '@/types';

import { fetchProjectInfo, fetchProjectItemsAndCategories, fetchProjectPlans } from '../(project)/fetch';
import compareItems from './compareItems';
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

// Comment: This component is used to compare two plans
const Comparison: FC<{ params: { id: string } }> = ({ params }) => {
  const { id } = params;

  const { planId, setPlanId } = usePlanIdLocal();
  const { planId: planId2, setPlanId: setPlanId2 } = usePlanIdLocal();
  const { categories, items, plans } = useProject();

  const [data, setData] = useState<ProjectData>({
    name: '',
    plans: [],
    items: [],
    categories: [],
  });

  // Fetch project data
  useEffect(() => {
    async function fetchData() {
      const [{name, members} , plans, { items, categories }] = await Promise.all([
        fetchProjectInfo(id),
        fetchProjectPlans(id),
        fetchProjectItemsAndCategories(id),
      ]);
      setData({ name, plans, items, categories });
    }

    fetchData().catch(console.error);
  }, [id]); // Dependency array to refetch when id changes

  // Filter items based on selected plan
  const filteredItems1 = useMemo(() => {
    const filteredItemIds =
      typeof planId === 'string'
        ? plans.find((plan) => plan.id === planId)?.items
        : undefined;
  
    if (filteredItemIds === undefined) return items;
    
    return items.filter((item) => filteredItemIds.includes(item.id));
  }, [planId, plans, items]);

  // Filter items based on selected plan
  const filteredItems2 = useMemo(() => {
    const filteredItemIds2 =
      typeof planId2 === 'string'
        ? plans.find((plan) => plan.id === planId2)?.items
        : undefined;
  
    if (filteredItemIds2 === undefined) return items;
    
    return items.filter((item) => filteredItemIds2.includes(item.id));
  }, [planId2, plans, items]);

  const [itemMap1, setItemMap1] = useState<ComparisonProps>({});
  const [itemMap2, setItemMap2] = useState<ComparisonProps>({});
  
  // Compare items when filteredItems1 or filteredItems2 change
  useEffect(() => {
    const [newItemMap1, newItemMap2] = compareItems(filteredItems1, filteredItems2);
    setItemMap1(newItemMap1);
    setItemMap2(newItemMap2);
  }, [filteredItems1, filteredItems2]); // Dependencies
  
  return (
    <div className="relative flex gap-2">
      <div className='flex w-[50%] flex-col gap-2'>
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
                  console.log("Plan Id: ",plan.id);
                  return (
                    <div className="relative z-0" key={plan.id}>
                      <SelectItem disabled={planId2 == plan.id} value={plan.id}>{plan.name}</SelectItem>
                    </div>
                  );
                })}
              </div>
              {data.plans.length === 0 && 'No plans available'}
            </SelectGroup>
          </SelectContent>
        </Select>
        <ScrollAreaHorizontalDemo planId={planId} filteredItems={filteredItems1} categories={categories} itemMap={itemMap1}/>
      </div>
      <div className='flex w-[50%] flex-col gap-2'>
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
                  console.log("Plan Id: ", plan.id);
                  return (
                    <div className="relative z-0" key={plan.id}>
                      <SelectItem disabled={planId == plan.id} value={plan.id}>{plan.name}</SelectItem>
                    </div>
                  );
                })}
              </div>
              {data.plans.length === 0 && 'No plans available'}
            </SelectGroup>
          </SelectContent>
        </Select>
        <ScrollAreaHorizontalDemo planId={planId2} filteredItems={filteredItems2} categories={categories} itemMap={itemMap2}/>
      </div>
    </div>
  );
}

export default Comparison;
