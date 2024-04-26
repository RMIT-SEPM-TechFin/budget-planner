'use client';

import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import { FC, useCallback, useMemo, useTransition } from 'react';

import {
  Table,
  TableActionCell,
  TableSortableHeader,
} from '@/components/table';
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import useNotification from '@/hooks/useNotification';
import type { Item } from '@/types';

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

const ItemTable: FC<{ planId: string | undefined }> = ({ planId }) => {
  const [_, startTransition] = useTransition();
  const { showNotification } = useNotification();
  const { projectId, categories, items, plans } = useProject();

  const filteredItems = useMemo(() => {
    const filteredItemIds =
      typeof planId === 'string'
        ? plans.find((plan) => plan.id === planId)?.items
        : undefined;

    if (filteredItemIds === undefined) return items;

    console.log('Filtered Item IDs:', filteredItemIds);

    return items.filter((item) => filteredItemIds.includes(item.id));
  }, [planId, plans, items]);

  const handleDelete = useCallback(
    (id: string) => {
      startTransition(() => {
        try {
          const planIdsContainItem = plans
            .filter((plan) => plan.items.includes(id))
            .map((plan) => plan.id);
          deleteItem(projectId, id, planIdsContainItem);
          showNotification({
            title: 'Item deleted',
            variant: 'success',
          });
        } catch {
          showNotification({
            title: 'Failed to delete item',
            variant: 'failure',
          });
        }
      });
    },
    [projectId, showNotification, plans],
  );

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
