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

import Chart, {data} from './Chart';


const ViewChartButton: FC<{ className?: string }> = ({ className}) => {

  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={'secondary'} className={className} onClick={() => setOpen(true)}>
          View Chart
        </Button>
      </DialogTrigger>
      <DialogContent className='!max-w-fit'>
        <DialogHeader>
          <DialogTitle>Plan 1 Cost Breakdown</DialogTitle>
          <DialogClose />
        </DialogHeader>
            <Chart />
        <DialogFooter className='flex !justify-center'>
            <div className='font-bold'>
                Total: 
            </div>
            <div>
                {data.reduce((acc, curr) => acc + curr.value, 0)}
            </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ViewChartButton;
