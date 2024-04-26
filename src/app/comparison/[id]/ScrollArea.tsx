'use client';

import Image from 'next/image';
import { FC, use, useEffect, useState } from 'react';
import { string } from 'zod';

import { ScrollArea, ScrollBar } from '@/components/ui/scrollarea';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { Category, Item, Plan } from '@/types';

import {
  fetchProjectItemsAndCategories,
  fetchProjectName,
  fetchProjectPlans,
} from '../../projects/[id]/fetch';
import ItemTable from './ItemTable';
import { usePlanIdLocal } from './useLocalId';

interface ProjectData {
  name: string;
  plans: Plan[];
  items: Item[];
  categories: Category[];
}

const ScrollAreaHorizontalDemo: FC<{
  classname?: string;
  params: { id: string };
}> = ({ classname, params }) => {
  const { id } = params;

  const { planId, setPlanId } = usePlanIdLocal();

  // State to store the fetched data
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

  return (
    <ScrollArea className="w-[50%] whitespace-nowrap rounded-md border">
      <div className="flex flex-col w-max gap-3 p-4">
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
        <ItemTable planId={planId} />
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
};

export default ScrollAreaHorizontalDemo;
