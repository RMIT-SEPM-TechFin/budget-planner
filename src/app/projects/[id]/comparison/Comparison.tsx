'use client';

import { FC, useEffect, useMemo, useState } from 'react';

import { useProject } from '@/app/projects/[id]/context';
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
import { Category, ComparisonProps, Item, Plan } from '@/types';

import ScrollAreaHorizontal from './ScrollArea';
import compareItems from './utils';

interface ProjectData {
  name: string;
  plans: Plan[];
  items: Item[];
  categories: Category[];
}

const Comparison: FC = () => {
  const [planId, setPlanId] = useState<string | undefined>(undefined);
  const [planId2, setPlanId2] = useState<string | undefined>(undefined);
  const { plans, items, categories } = useProject();

  const [data, setData] = useState<ProjectData>({
    name: '',
    plans: [],
    items: [],
    categories: [],
  });

  useEffect(() => {
    setData({
      name: '',
      plans: plans,
      items: items,
      categories: categories,
    });
  }, [plans, items, categories]);

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
    const [newItemMap1, newItemMap2] = compareItems(
      filteredItems1,
      filteredItems2,
    );
    setItemMap1(newItemMap1);
    setItemMap2(newItemMap2);
  }, [filteredItems1, filteredItems2]); // Dependencies

  return (
    <div className="relative flex gap-2">
      <div className="flex w-[50%] flex-col gap-2">
        <Select
          onValueChange={(value) => {
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
                      <SelectItem disabled={planId2 == plan.id} value={plan.id}>
                        {plan.name}
                      </SelectItem>
                    </div>
                  );
                })}
              </div>
              {data.plans.length === 0 && 'No plans available'}
            </SelectGroup>
          </SelectContent>
        </Select>
        <ScrollAreaHorizontal
          planId={planId}
          filteredItems={filteredItems1}
          categories={categories}
          itemMap={itemMap1}
        />
      </div>
      <div className="flex w-[50%] flex-col gap-2">
        <Select
          onValueChange={(value) => {
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
                      <SelectItem disabled={planId == plan.id} value={plan.id}>
                        {plan.name}
                      </SelectItem>
                    </div>
                  );
                })}
              </div>
              {data.plans.length === 0 && 'No plans available'}
            </SelectGroup>
          </SelectContent>
        </Select>
        <ScrollAreaHorizontal
          planId={planId2}
          filteredItems={filteredItems2}
          categories={categories}
          itemMap={itemMap2}
        />
      </div>
    </div>
  );
};

export default Comparison;
