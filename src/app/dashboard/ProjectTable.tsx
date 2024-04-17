'use client';

import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import Link from 'next/link';
import { FC, useCallback, useMemo, useTransition } from 'react';

import {
  Table,
  TableActionCell,
  TableSortableHeader,
} from '@/components/table';
import useNotification from '@/hooks/useNotification';
import type { Project } from '@/types';

import { deleteProject } from './actions';

interface ProjectTableProps {
  projects: Project[];
}

// create columns based on this guide instead of shadcn for better type handling
// https://github.com/TanStack/table/issues/4302#issuecomment-1531196901
const columnHelper = createColumnHelper<Project>();

const staticColumns = [
  columnHelper.accessor('name', {
    header: 'Name',
    cell: (props) => {
      const name = props.getValue();
      return (
        <Link
          className="hover:underline"
          href={`/projects/${props.row.original.id}`}
        >
          {name}
        </Link>
      );
    },
  }),
  columnHelper.accessor('ownerName', {
    header: 'Owner',
    cell: (props) => props.getValue(),
  }),
  columnHelper.accessor('createdAt', {
    header: (props) => <TableSortableHeader title="Created At" props={props} />,
    cell: (props) =>
      props.getValue().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }),
  }),
] as ColumnDef<Project>[];

const ProjectTable: FC<ProjectTableProps> = ({ projects }) => {
  const { showNotification } = useNotification();

  const [_, startTransition] = useTransition();

  const handleDelete = useCallback(
    (id: string) => {
      startTransition(() => {
        try {
          deleteProject(id);
          showNotification({
            title: 'Project deleted',
            variant: 'success',
          });
        } catch {
          showNotification({
            title: 'Failed to delete project',
            variant: 'failure',
          });
        }
      });
    },
    [showNotification],
  );

  const columns = useMemo(
    () =>
      [
        ...staticColumns,
        columnHelper.accessor('id', {
          header: () => null,
          cell: (props) => (
            <TableActionCell
              actionItems={[
                {
                  label: 'Delete',
                  // NOTES: members and owners can all delete the project
                  onClick: () => handleDelete(props.getValue() as string),
                },
              ]}
            />
          ),
        }),
      ] as ColumnDef<Project>[],
    [handleDelete],
  );

  return <Table columns={columns} data={projects} searchableColumnKey="name" />;
};

export default ProjectTable;
