'use client';

import { PieChart } from 'lucide-react';
import { FC, useMemo, useState } from 'react';

import ActionIconButton from '@/components/ActionIconButton';
import ItemsChart from '@/components/ItemsChart';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import { useProject } from './context';
import { usePlanIdQueryParam } from './hooks';

const ViewChartButton: FC<{}> = () => {
  const {name, plans, items} = useProject();
  const { planId } = usePlanIdQueryParam();

  const [open, setOpen] = useState(false);

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
        <ActionIconButton
          Icon={PieChart}
          tooltip="View Chart"
          onClick={() => setOpen(true)}
        />
      </DialogTrigger>
      <DialogContent className="!max-w-fit">
        <DialogHeader>
          <DialogTitle>
            {selectedPlan ? selectedPlan.name : name} Cost Breakdown
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
