'use client'

import { getCookie } from 'cookies-next';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { FC, useEffect, useMemo, useState } from 'react';

import { useProject } from '@/app/projects/[id]/context';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectSeparator, SelectTrigger, SelectValue } from '@/components/ui/select';
import { USER_EMAIL_COOKIE_NAME } from '@/constants';
import { Category, ComparisonProps,Item, Plan } from '@/types';

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
    
    return items.filter((item) => filteredItemIds.includes(item.id));
  }, [planId, plans, items]);

  const filteredItems2 = useMemo(() => {
    const filteredItemIds2 =
      typeof planId2 === 'string'
        ? plans.find((plan) => plan.id === planId2)?.items
        : undefined;
  
    if (filteredItemIds2 === undefined) return items;
    
    return items.filter((item) => filteredItemIds2.includes(item.id));
  }, [planId2, plans, items]);

  function compareItems(items1: Item[], items2: Item[]) {
    const itemMap1: ComparisonProps = {};

    const itemMap2: ComparisonProps = {};

    const items1Map = new Map(items1.map(item => [`${item.category}-${item.name}`, item]));
    const items2Map = new Map(items2.map(item => [`${item.category}-${item.name}`, item]));
    console.log('Items 1 Map:', items1Map);
    console.log('Items 2 Map:', items2Map);
  
    // Check for items in items1 not in items2 or different
    items1.forEach(item => {
      const key = `${item.category}-${item.name}`;
      const item2 = items2Map.get(key);
    
      if (!item2) {
        itemMap1[item.id] = "bg-comparison-red";  // Item by this name and category doesn't exist in items2
      } else {
        let propertiesDiffer = false;
        loop1:
        for (const [key, value] of Object.entries(item)) {
          if (value !== item2[key as keyof typeof item2]) {
            propertiesDiffer = true;
            break loop1;  // Stop at the first differing property
          }
        }
        if (propertiesDiffer) {
          itemMap1[item.id] = "bg-comparison-yellow";  // Properties differ
        }
      }
    });

    // Check for items in items2 not in items1 or different
    items2.forEach(item => {
      const key = `${item.category}-${item.name}`;
      const item1 = items1Map.get(key);
    
      if (!item1) {
        itemMap2[item.id] = "bg-comparison-green";  // Item by this name and category doesn't exist in items2
      } else {
        let propertiesDiffer = false;
        loop2:
        for (const [key, value] of Object.entries(item)) {
          if (value !== item1[key as keyof typeof item1]) {
            propertiesDiffer = true;
            break loop2;  // Stop at the first differing property
          }
        }
        if (propertiesDiffer) {
          itemMap2[item.id] = "bg-comparison-yellow";  // Properties differ
        }
      }
    });
    return [itemMap1, itemMap2];
  };

  const [itemMap1, setItemMap1] = useState<ComparisonProps>({});
  const [itemMap2, setItemMap2] = useState<ComparisonProps>({});
  
  useEffect(() => {
    const [newItemMap1, newItemMap2] = compareItems(filteredItems1, filteredItems2);
    setItemMap1(newItemMap1);
    setItemMap2(newItemMap2);
  }, [filteredItems1, filteredItems2]); // Dependencies
  
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
        <ScrollAreaHorizontalDemo planId={planId} filteredItems={filteredItems1} categories={categories} itemMap={itemMap1}/>
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
        <ScrollAreaHorizontalDemo planId={planId2} filteredItems={filteredItems2} categories={categories} itemMap={itemMap2}/>
      </div>
    </div>
  );
}

export default Comparison;
