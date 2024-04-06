'use client';

import { ColumnDef } from '@tanstack/react-table';
import { FC, useTransition } from 'react';

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

const staticColumns: ColumnDef<Project>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
    cell: (props) => props.getValue(),
  },
  {
    accessorKey: 'ownerName',
    header: 'Owner',
    cell: (props) => props.getValue(),
  },
  {
    accessorKey: 'createdAt',
    header: (props) => <TableSortableHeader title="Created At" props={props} />,
    cell: (props) =>
      (props.getValue() as Date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }),
  },
];

const ProjectTable: FC<ProjectTableProps> = ({ projects }) => {
  const { showNotification } = useNotification();

  const [_, startTransition] = useTransition();

  const handleDelete = (id: string) => {
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
  };

  const columns: ColumnDef<Project>[] = [
    ...staticColumns,
    {
      accessorKey: 'id',
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
    },
  ];

  return <Table columns={columns} data={projects} searchableColumnKey="name" />;
};

export default ProjectTable;
