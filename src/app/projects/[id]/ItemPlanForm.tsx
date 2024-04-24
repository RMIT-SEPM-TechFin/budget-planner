'use client';

import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import { FC, useCallback, useMemo, useTransition } from 'react';
import { Control, UseFormSetValue } from 'react-hook-form';

import {
  Table,
  TableActionCell,
  TableSortableHeader,
} from '@/components/table';
import { Checkbox } from '@/components/ui/checkbox';
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { FormControl, FormField, FormItem } from '@/components/ui/form';
import useNotification from '@/hooks/useNotification';
import type { Item } from '@/types';

import { deleteItem } from './actions';
import { useProject } from './context';
import { usePlanIdQueryParam } from './hooks';
import ItemForm from './ItemForm';

const columnHelper = createColumnHelper<Item>();

const staticColumns = [
  columnHelper.accessor('name', {
    id: 'name',
    header: 'Name',
    cell: (props) => props.getValue(),
  }),
  columnHelper.accessor('description', {
    id: 'description',
    header: 'Description',
    // TODO: shorten string
    cell: (props) => props.getValue(),
  }),
  columnHelper.accessor('price', {
    id: 'price',
    header: (props) => <TableSortableHeader title="Price" props={props} />,
    cell: (props) => '$' + props.getValue(),
  }),
  columnHelper.accessor('quantity', {
    id: 'quantity',
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

const ItemPlanForm: FC<{
  formControl: Control<
    {
      name: string;
      items: string[];
    },
    any
  >;
  setValue: UseFormSetValue<{
    name: string;
    items: string[];
  }>;
  defaultValue?: string[];
}> = ({ formControl, setValue, defaultValue }) => {
  const [_, startTransition] = useTransition();
  const { showNotification } = useNotification();
  const { projectId, categories, items, plans } = useProject();

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
        columnHelper.accessor('id', {
          id: 'checkbox',
          header: ({ table }) => (
            <Checkbox
              checked={
                table.getIsAllPageRowsSelected() ||
                (table.getIsSomePageRowsSelected() && 'indeterminate')
              }
              onCheckedChange={(value) => {
                table.toggleAllPageRowsSelected(!!value);
                setValue('items', value ? items.map((item) => item.id) : []);
              }}
              aria-label="Select all"
            />
          ),
          cell: ({ row }) => (
            <FormField
              name="items"
              control={formControl}
              key={row.original.id}
              render={({ field }) => {
                return (
                  <FormItem key={row.original.id}>
                    <FormControl>
                      <Checkbox
                        defaultChecked={
                          defaultValue?.includes(row.original.id) ||
                          row.getIsSelected()
                        }
                        value={row.original.id}
                        onCheckedChange={(checked) => {
                          row.toggleSelected(!!checked);
                          return checked
                            ? field.onChange([...field.value, row.original.id])
                            : field.onChange(
                                field.value?.filter(
                                  (value) => value !== row.original.id,
                                ),
                              );
                        }}
                        aria-label="Select row"
                      />
                    </FormControl>
                  </FormItem>
                );
              }}
            />
          ),
        }),
        ,
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
          id: 'actions',
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
    [categories, handleDelete, items, formControl, setValue, defaultValue],
  );

  return (
    <Table
      showCheckbox={true}
      columns={columns}
      data={items}
      searchableColumnKey="name"
    />
  );
};

export default ItemPlanForm;
