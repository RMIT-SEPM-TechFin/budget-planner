'use client';

import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import { FC, useCallback, useTransition } from 'react';

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
import useProject from '@/hooks/useProject';
import { Category, Item } from '@/types';

import { deleteItem } from './actions';
import ItemForm from './ItemForm';

interface ItemTableProps {
  items: Item[];
  categories: Category[];
}

// create columns based on this guide instead of shadcn for better type handling
// https://github.com/TanStack/table/issues/4302#issuecomment-1531196901
const columnHelper = createColumnHelper<Item>();

const ItemTable: FC<ItemTableProps> = ({ items, categories }) => {
  const staticColumns = [
    columnHelper.accessor('category', {
      header: (props) => <TableSortableHeader title="Category" props={props} />,
      cell: (props) =>
        categories.find((category) => category.id === props.getValue())?.name,
    }),
    columnHelper.accessor('name', {
      header: 'Name',
      cell: (props) => props.getValue(),
    }),
    columnHelper.accessor('description', {
      header: 'Description',
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

  const { showNotification } = useNotification();

  const { projectId } = useProject();

  const [_, startTransition] = useTransition();

  const handleDelete = useCallback(
    (id: string) => {
      startTransition(() => {
        try {
          deleteItem(projectId, id);
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
    [projectId, showNotification],
  );

  const columns = [
    ...staticColumns,
    columnHelper.accessor('id', {
      header: () => null,
      cell: (props) => (
        <TableActionCell
          editAction={
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Edit Item</DialogTitle>
                <DialogDescription> the item details below</DialogDescription>
                <DialogClose />
              </DialogHeader>
              <ItemForm
                categories={categories}
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
  ] as ColumnDef<Item>[];
  return <Table columns={columns} data={items} searchableColumnKey="name" />;
};

export default ItemTable;
