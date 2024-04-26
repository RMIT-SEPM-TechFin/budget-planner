'use client';

import { FC, useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import Chart from '../../../components/Chart/PieChart';

const ViewChartButton: FC<{
  className?: string;
  projectName: string;
  // TODO: define type for items
  items: any;
}> = ({ className, projectName, items }) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant={'secondary'}
          className={className}
          onClick={() => setOpen(true)}
        >
          View Chart
        </Button>
      </DialogTrigger>
      <DialogContent className="!max-w-fit">
        <DialogHeader>
          <DialogTitle>{projectName} Cost Breakdown</DialogTitle>
          <DialogClose />
        </DialogHeader>
        <Chart className="text-2xl" data={items} />
        <DialogFooter className="flex !justify-center ">
          <div className="text-2xl font-bold">Total:</div>
          <div className="text-2xl">
            {items.reduce(
              (acc: any, curr: any) => acc + curr.price * curr.quantity,
              0,
            )}
            $
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ViewChartButton;
