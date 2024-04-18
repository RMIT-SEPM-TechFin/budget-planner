import { MoreHorizontal } from 'lucide-react';
import { FC, ReactNode, useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { Dialog } from '../ui/dialog';

interface TableActionCellProps {
  editAction?: ReactNode;
  actionItems: {
    label: string;
    onClick?: () => void;
    children?: ReactNode;
  }[];
}

const TableActionCell: FC<TableActionCellProps> = ({
  actionItems,
  editAction,
}) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <div className="flex items-center justify-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {editAction && (
                <DropdownMenuItem onClick={() => setOpen(true)}>
                  Edit
                </DropdownMenuItem>
              )}
              {actionItems.map((item, idx) => (
                <DropdownMenuItem key={idx} onClick={item.onClick}>
                  {item.label}
                  {item.children && (
                    <span className="ml-2">{item.children}</span>
                  )}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        {editAction && editAction}
      </Dialog>
    </>
  );
};

export default TableActionCell;
