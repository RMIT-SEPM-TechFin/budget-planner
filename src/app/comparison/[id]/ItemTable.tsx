'use client';

import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import { FC, useCallback, useMemo, useTransition } from 'react';

import {
  Table,
  TableActionCell,
  TableSortableHeader,
} from '@/components/table';
import useNotification from '@/hooks/useNotification';
import type { Category, Item } from '@/types';

import { deleteItem } from '../../projects/[id]/actions';
import { useProject } from '../../projects/[id]/context';

const columnHelper = createColumnHelper<Item>();

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

const ItemTable: FC<{ planId: string | undefined, filteredItems: Item[], categories: Category[] }> = ({ planId, filteredItems, categories }) => {

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
    <Table columns={columns} data={filteredItems} showPagination={false} />
  );
};

export default ItemTable;
