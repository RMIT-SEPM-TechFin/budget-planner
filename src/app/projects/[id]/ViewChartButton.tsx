'use client';

import { PieChart } from 'lucide-react';
import { FC, useMemo, useState } from 'react';

import ActionIconButton from '@/components/ActionIconButton';
import CategoriesChart from '@/components/CategoriesChart';
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Category, Item, Plan } from '@/types';

import { useProject } from './context';
import { usePlanIdQueryParam } from './hooks';

const ViewChartButton: FC<{}> = () => {
  const { name, plans, items, categories } = useProject();
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

  const itemsToDisplayWithCategoryNames = useMemo(() => {
    // Create a mapping of category IDs to category names
    const categoryMap: { [categoryId: string]: string } = {};
    categories.forEach((category) => {
      categoryMap[category.id] = category.name;
    });

    // Map items to display with their corresponding category names
    return selectedPlan
      ? items
          .filter((item) => selectedPlan.items.includes(item.id))
          .map((item) => ({
            ...item,
            category: categoryMap[item.category],
          }))
      : items.map((item) => ({
          ...item,
          category: categoryMap[item.category],
        }));
  }, [items, selectedPlan, categories]);

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

          <Tabs defaultValue="item" className="!max-w-fit">
            <TabsList>
              <TabsTrigger value="item">Items</TabsTrigger>
              <TabsTrigger value="category">Categories</TabsTrigger>
            </TabsList>

            <TabsContent value="item">
              <ItemsChart items={itemsToDisplay} />
              <DialogFooter className="flex !justify-center ">
                <div className="text-2xl font-bold">Total:</div>
                <div className="text-2xl">{planDataItem}$</div>
              </DialogFooter>
            </TabsContent>

            <TabsContent value="category">
              <CategoriesChart items={itemsToDisplayWithCategoryNames} />
              <DialogFooter className="flex !justify-center ">
                <div className="text-2xl font-bold">Total:</div>
                <div className="text-2xl">{planDataItem}$</div>
              </DialogFooter>
            </TabsContent>
          </Tabs>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default ViewChartButton;
