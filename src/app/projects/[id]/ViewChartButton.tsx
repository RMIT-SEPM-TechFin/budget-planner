'use client';

import { FC, useMemo, useState } from 'react';

import ItemsChart from '@/components/ItemsChart';
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
import { Item, Plan } from '@/types';

import { usePlanIdQueryParam } from './hooks';

const ViewChartButton: FC<{
  className?: string;
  projectName: string;
  items: Item[];
  plans: Plan[];
}> = ({ className, projectName, items, plans }) => {
  const [open, setOpen] = useState(false);

  const { planId } = usePlanIdQueryParam();

  const selectedPlan = useMemo(
    () => plans.find((plan) => plan.id == planId),
    [plans, planId],
  );

  const itemsToDisplay = useMemo(
    () =>
      selectedPlan
        ? items.filter((item: { id: string }) =>
            selectedPlan.items.includes(item.id),
          )
        : items,
    [items, selectedPlan],
  );

  const planDataItem = useMemo(
    () =>
      itemsToDisplay.reduce((acc, item) => acc + item.price * item.quantity, 0),
    [itemsToDisplay],
  );

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
          <DialogTitle>
            {selectedPlan ? selectedPlan.name : projectName} Cost Breakdown
          </DialogTitle>
          <DialogClose />
        </DialogHeader>
        <ItemsChart items={itemsToDisplay} />
        <DialogFooter className="flex !justify-center ">
          <div className="text-2xl font-bold">Total:</div>
          <div className="text-2xl">{planDataItem}$</div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ViewChartButton;