'use client';

import { FC } from 'react';

import { ScrollArea, ScrollBar } from '@/components/ui/scrollarea';
import type { Category, ComparisonProps, Item } from '@/types';

import ItemTable from './ComparisonItemTable';

// Component to display a horizontal scroll area
const ScrollAreaHorizontal: FC<{
  filteredItems: Item[];
  categories: Category[];
  itemMap: ComparisonProps;
}> = ({ filteredItems, categories, itemMap }) => {
  return (
    <ScrollArea className="w-full whitespace-nowrap rounded-md border">
      <ItemTable
        filteredItems={filteredItems}
        categories={categories}
        itemMap={itemMap}
      />
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
};

export default ScrollAreaHorizontal;
