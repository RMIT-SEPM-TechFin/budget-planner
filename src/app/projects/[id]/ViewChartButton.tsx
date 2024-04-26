'use client';

import { FC, useEffect, useState } from 'react';

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

import Chart from '../../../components/Chart/PieChart';
import { usePlanIdQueryParam } from './hooks';

const ViewChartButton: FC<{
  className?: string;
  projectName: string;
  data: any;
  plans: Plan[];
}> = ({ className, projectName, data, plans }) => {
  const [open, setOpen] = useState(false);

  const { planId, setPlanId } = usePlanIdQueryParam();
  const [planItems, setPlanItems] = useState<Item[]>([]);
  const selectedPlan = plans.find((plan) => plan.id == planId);

  const planName = selectedPlan ? selectedPlan.name : projectName;

  useEffect(() => {
    if (selectedPlan) {
      const selectedPlanItems = data.filter((item: { id: string }) =>
        selectedPlan.items.includes(item.id),
      );
      setPlanItems(selectedPlanItems);
    }
  }, [selectedPlan, data]);
  const displayDataItem = selectedPlan ? planItems : data;
  const planDataItem = selectedPlan
    ? planItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
    : data.reduce((acc: any, curr: any) => acc + curr.price * curr.quantity, 0);
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
          <DialogTitle>{planName} Cost Breakdown</DialogTitle>
          <DialogClose />
        </DialogHeader>
        <Chart className="text-2xl" data={displayDataItem} />
        <DialogFooter className="flex !justify-center ">
          <div className="text-2xl font-bold">Total:</div>
          <div className="text-2xl">{planDataItem}$</div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ViewChartButton;
