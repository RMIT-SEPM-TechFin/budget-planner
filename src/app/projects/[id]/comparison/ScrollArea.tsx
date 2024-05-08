'use client';

import { FC } from 'react';

import { ScrollArea, ScrollBar } from '@/components/ui/scrollarea';
import type { Category, ComparisonProps, Item } from '@/types';

import ItemTable from './ComparisonItemTable';

// Component to display a horizontal scroll area
const ScrollAreaHorizontal: FC<{
  classname?: string;
  planId: string | undefined;
  filteredItems: Item[];
  categories: Category[];
  itemMap: ComparisonProps;
}> = ({ classname, filteredItems, categories, planId, itemMap }) => {
  return (
    <ScrollArea className="w-full whitespace-nowrap rounded-md border">
      <div className="flex flex-col w-max gap-3 p-4">
        <ItemTable
          filteredItems={filteredItems}
          categories={categories}
          planId={planId}
          itemMap={itemMap}
        />
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
};

export default ScrollAreaHorizontal;
