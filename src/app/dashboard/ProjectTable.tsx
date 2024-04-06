'use client';

import { ColumnDef } from '@tanstack/react-table';
import { FC } from 'react';

import {
  Table,
  TableActionCell,
  TableSortableHeader,
} from '@/components/table';
import type { Project } from '@/types';

interface ProjectTableProps {
  projects: Project[];
}

const columns: ColumnDef<Project>[] = [
  {
    accessorKey: 'name',
    header: (props) => <TableSortableHeader title="Name" props={props} />,
    cell: (props) => props.getValue(),
  },
  {
    accessorKey: 'ownerName',
    header: (props) => <TableSortableHeader title="Owner" props={props} />,
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
  {
    accessorKey: 'id',
    header: () => null,
    cell: () => (
      <TableActionCell
        actionItems={[
          {
            label: 'Delete',
            onClick: () => {
              // handle delete
            },
          },
        ]}
      />
    ),
  },
];

const ProjectTable: FC<ProjectTableProps> = ({ projects }) => {
  return <Table columns={columns} data={projects} searchableColumnKey="name" />;
};

export default ProjectTable;
