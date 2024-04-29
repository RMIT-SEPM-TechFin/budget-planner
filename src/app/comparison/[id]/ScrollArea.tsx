'use client';

import Image from 'next/image';
import { FC, use, useEffect, useState } from 'react';
import { string } from 'zod';

import { ScrollArea, ScrollBar } from '@/components/ui/scrollarea';
import type { Category, Item, Plan } from '@/types';

import {
  fetchProjectItemsAndCategories,
  fetchProjectName,
  fetchProjectPlans,
} from '../../projects/[id]/fetch';
import ItemTable from './ItemTable';
import { usePlanIdLocal } from './useLocalId';

const ScrollAreaHorizontalDemo: FC<{
  classname?: string;
  planId: string | undefined;
  filteredItems: Item[];
  categories: Category[];
}> = ({ classname, filteredItems, categories, planId }) => {

  return (
    <ScrollArea className="w-max whitespace-nowrap rounded-md border">
      <div className="flex flex-col w-max gap-3 p-4">
        <ItemTable filteredItems={filteredItems} categories={categories} planId={planId} />
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
};

export default ScrollAreaHorizontalDemo;
