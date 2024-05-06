'use client';

import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import { FC, useMemo } from 'react';

import { TableSortableHeader } from '@/components/table';
import type { Category, ComparisonProps, Item } from '@/types';

import Table from './ComparisonTable';

const columnHelper = createColumnHelper<Item>();

// Define static columns
const staticColumns = [
  columnHelper.accessor('name', {
    header: 'Name',
    cell: (props) => props.getValue(),
  }),
  columnHelper.accessor('description', {
    header: 'Description',
    // TODO: shorten string
    cell: (props) => props.getValue(),
  }),
  columnHelper.accessor('price', {
    header: (props) => <TableSortableHeader title="Price" props={props} />,
    cell: (props) => '$' + props.getValue(),
  }),
  columnHelper.accessor('quantity', {
    header: (props) => <TableSortableHeader title="Quantity" props={props} />,
    cell: (props) => props.getValue(),
  }),
  columnHelper.accessor((row) => '$' + row.price * row.quantity, {
    id: 'total-price',
    header: (props) => (
      <TableSortableHeader title="Total Price" props={props} />
    ),
  }),
] as ColumnDef<Item>[];

// Comment: This is a table component that uses the react-table library
const ItemTable: FC<{
  planId: string | undefined;
  filteredItems: Item[];
  categories: Category[];
  itemMap: ComparisonProps;
}> = ({ planId, filteredItems, categories, itemMap }) => {
  const columns = useMemo(
    () =>
      [
        columnHelper.accessor('category', {
          header: (props) => (
            <TableSortableHeader title="Category" props={props} />
          ),
          cell: (props) =>
            categories.find((category) => category.id === props.getValue())
              ?.name,
        }),
        ...staticColumns,
      ] as ColumnDef<Item>[],
    [categories],
  );

  return (
    <Table
      columns={columns}
      data={filteredItems}
      showPagination={false}
      itemMap={itemMap}
    />
  );
};

export default ItemTable;
