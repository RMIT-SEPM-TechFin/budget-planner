'use client';

import Image from 'next/image';
import { FC, use, useEffect, useState } from 'react';
import { string } from 'zod';

import { ScrollArea, ScrollBar } from '@/components/ui/scrollarea';
import type { Category, ComparisonProps, Item, Plan } from '@/types';

import {
  fetchProjectItemsAndCategories,
  fetchProjectName,
  fetchProjectPlans,
} from '../../projects/[id]/fetch';
import ItemTable from './ComparisonItemTable';
import { usePlanIdLocal } from './useLocalId';

// Component to display a horizontal scroll area
const ScrollAreaHorizontalDemo: FC<{
  classname?: string;
  planId: string | undefined;
  filteredItems: Item[];
  categories: Category[];
  itemMap: ComparisonProps;
}> = ({ classname, filteredItems, categories, planId, itemMap }) => {

  console.log("iteMap in ScrollAreaHorizontalDemo:", itemMap);
  return (
    <ScrollArea className="w-max whitespace-nowrap rounded-md border">
      <div className="flex flex-col w-max gap-3 p-4">
        <ItemTable filteredItems={filteredItems} categories={categories} planId={planId} itemMap={itemMap} />
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
};

export default ScrollAreaHorizontalDemo;
