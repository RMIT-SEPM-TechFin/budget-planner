'use client';

import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { FC, useCallback, useTransition } from "react";

import { Table, TableActionCell, TableSortableHeader } from "@/components/table";
import useNotification from "@/hooks/useNotification";
import { Item } from "@/types";

interface ItemTableProps {
    items: Item[];
}

// create columns based on this guide instead of shadcn for better type handling
// https://github.com/TanStack/table/issues/4302#issuecomment-1531196901
const columnHelper = createColumnHelper<Item>();
const staticColumns = [
    columnHelper.accessor("category", {
        header: (props) => <TableSortableHeader title="Category" props={props} />,
        cell: (props) => props.getValue(),
    }),
    columnHelper.accessor("name", {
        header: "Name",
        cell: (props) => props.getValue(),
    }),
    columnHelper.accessor("description", {
        header: "Description",
        cell: (props) => props.getValue(),
    }),
    columnHelper.accessor("price", {
        header: (props) => <TableSortableHeader title="Price" props={props} />,
        cell: (props) => "$" + props.getValue(),
    }),
    columnHelper.accessor("quantity", {
        header: (props) => <TableSortableHeader title="Quantity" props={props} />,
        cell: (props) => props.getValue(),
    }),
    columnHelper.accessor(row => "$" + row.price * row.quantity, {
        id: "total-price", 
        header: (props) => <TableSortableHeader title="Total Price" props={props} />,
    }),
] as ColumnDef<Item>[];

const ItemTable: FC<ItemTableProps> = ({ items }) => {
    const {showNotification} = useNotification();

    const [_, startTransition] = useTransition();

    const handleDelete = useCallback(
        (id: string) => {
            startTransition(() => {
                try {
                    // deleteProject(id);
                    showNotification({
                        title: "Item deleted",
                        variant: "success",
                    });
                } catch {
                    showNotification({
                        title: "Failed to delete item",
                        variant: "failure",
                    });
                }
            });
        }, [showNotification]
    )

    const handleEdit = useCallback(
        (id: string) => {
            startTransition(() => {
                try {
                    // editProject(id);
                    showNotification({
                        title: "Item edited",
                        variant: "success",
                    });
                } catch {
                    showNotification({
                        title: "Failed to edit item",
                        variant: "failure",
                    });
                }
            });
        }, [showNotification]
    )

    const columns = [
        ...staticColumns,
        columnHelper.accessor("id", {
            header: () => null,
            cell: (props) => (
                <TableActionCell
                    actionItems={[
                        {
                            label: "Edit",
                            onClick: () => handleEdit(props.getValue() as string),
                        },
                        {
                            label: "Delete",
                            onClick: () => handleDelete(props.getValue() as string),
                        },
                    ]}
                />
            ),
        }),

    ] as ColumnDef<Item>[];
    return <Table columns={columns} data={items} searchableColumnKey="name"/>;


}

export default ItemTable;
