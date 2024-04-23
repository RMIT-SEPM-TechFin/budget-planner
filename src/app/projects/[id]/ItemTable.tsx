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

import { deleteItem } from './actions';
import { useProject } from './context';
import { usePlanIdQueryParam } from './hooks';
import ItemForm from './ItemForm';

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

const ItemTable: FC = () => {
  const [_, startTransition] = useTransition();
  const { showNotification } = useNotification();
  const { projectId, categories, items, plans } = useProject();
  const { planId } = usePlanIdQueryParam();

  const filteredItems = useMemo(() => {
    const filteredItemIds =
      typeof planId === 'string'
        ? plans.find((plan) => plan.id === planId)?.items
        : undefined;

    if (filteredItemIds === undefined) return items;

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
        columnHelper.accessor('id', {
          header: () => null,
          cell: (props) => (
            <TableActionCell
              editAction={
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Edit Item</DialogTitle>
                    <DialogDescription>
                      {' '}
                      the item details below
                    </DialogDescription>
                    <DialogClose />
                  </DialogHeader>
                  <ItemForm
                    editItemData={
                      items.find(
                        (item) => item.id === (props.getValue() as string),
                      ) || undefined
                    }
                  />
                </DialogContent>
              }
              actionItems={[
                {
                  label: 'Delete',
                  onClick: () => handleDelete(props.getValue() as string),
                },
              ]}
            />
          ),
        }),
      ] as ColumnDef<Item>[],
    [categories, handleDelete, items],
  );

  return (
    <Table columns={columns} data={filteredItems} searchableColumnKey="name" />
  );
};

export default ItemTable;
