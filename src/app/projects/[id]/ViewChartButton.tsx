'use client';

import { PieChart } from 'lucide-react';
import { FC, useMemo, useState } from 'react';

import ActionIconButton from '@/components/ActionIconButton';
import CategoriesBarChart from '@/components/CategoriesBarChart';
import CategoriesLineChart from '@/components/CategoriesLineChart';
import CategoriesPieChart from '@/components/CategoriesPieChart';
import ItemsBarChart from '@/components/ItemsBarChart';
import ItemsLineChart from '@/components/ItemsLineChart';
import ItemsPieChart from '@/components/ItemsPieChart';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { useProject } from './context';
import { usePlanIdQueryParam } from './hooks';

const ViewChartButton: FC<{}> = () => {
  const { name, plans, items, categories } = useProject();
  const { planId } = usePlanIdQueryParam();

  const [open, setOpen] = useState(false);
  const [selectedChart, setSelectedChart] = useState<string>('pie chart');
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

  const renderItemsChart = (type: string, items: any) => {
    switch (type) {
      case 'pie chart':
        return <ItemsPieChart items={items} />;
      case 'bar chart':
        return <ItemsBarChart items={items} />;
      case 'line chart':
        return <ItemsLineChart items={items} />;
      default:
        return null;
    }
  };

  const renderCategoriesChart = (type: string, categories: any) => {
    switch (type) {
      case 'pie chart':
        return <CategoriesPieChart items={categories} />;
      case 'bar chart':
        return <CategoriesBarChart items={categories} />;
      case 'line chart':
        return <CategoriesLineChart items={categories} />;
      default:
        return null;
    }
  };

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

          <Tabs defaultValue="item">
            <div className="grid grid-cols-2">
              <TabsList className="col-span-1 col-start-2 w-[170px]">
                <TabsTrigger value="item">Items</TabsTrigger>
                <TabsTrigger value="category">Categories</TabsTrigger>
              </TabsList>

              <Select
                defaultValue={selectedChart}
                onValueChange={setSelectedChart}
              >
                <SelectTrigger className="w-[180px] col-end-7">
                  <SelectValue placeholder="Select Chart" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Chart</SelectLabel>
                    <SelectItem value="pie chart">Pie Chart</SelectItem>
                    <SelectItem value="bar chart">Bar Chart</SelectItem>
                    <SelectItem value="line chart">Line Chart</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <TabsContent value="item">
              {/* <ItemsBarChart items={itemsToDisplay} /> */}

              {renderItemsChart(selectedChart, itemsToDisplay)}

              <DialogFooter className="flex !justify-center ">
                <div className="text-2xl font-bold">Total:</div>
                <div className="text-2xl">{planDataItem}$</div>
              </DialogFooter>
            </TabsContent>

            <TabsContent value="category">
              {/* <CategoriesBarChart items={itemsToDisplayWithCategoryNames} /> */}

              {renderCategoriesChart(
                selectedChart,
                itemsToDisplayWithCategoryNames,
              )}

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
