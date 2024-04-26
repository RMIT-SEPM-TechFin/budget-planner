'use client';

import { Check, X } from 'lucide-react';
import { FC, useCallback, useState, useTransition } from 'react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import useAuth from '@/hooks/useAuth';
import useNotification from '@/hooks/useNotification';
import { cn } from '@/lib/utils';

import Chart from '../../../components/Chart/PieChart';

const ViewChartButton: FC<{
  className?: string;
  projectName: string;
  data: any;
}> = ({ className, projectName, data }) => {
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
        <Chart className="text-2xl" data={data} />
        <DialogFooter className="flex !justify-center ">
          <div className="text-2xl font-bold">Total:</div>
          <div className="text-2xl">
            {data.reduce(
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
