'use client';

import { MoreVertical, Plus } from 'lucide-react';
import { FC, useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
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
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { Plan } from '@/types';

import { usePlanIdQueryParam } from './hooks';
import PlanForm from './PlanForm';

interface SelectPlanProps {
  plans: Plan[];
}

const SelectPlanToDisplay: FC<SelectPlanProps> = ({ plans }) => {
  const { planId, setPlanId } = usePlanIdQueryParam();
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

  return (
    <Select
      defaultValue={planId ?? 'all'}
      onValueChange={(value) => {
        setPlanId(value === 'all' ? undefined : value);
      }}
    >
      <SelectTrigger className="w-[280px]">
        <SelectValue placeholder="Select a plan" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All Items</SelectItem>
        <SelectSeparator />
        <SelectGroup>
          <div className="relative">
            <SelectLabel>Plans</SelectLabel>
            <Dialog open={openAdd} onOpenChange={setOpenAdd}>
              <DialogTrigger asChild>
                <Button
                  variant="ghost"
                  className="absolute h-8 w-8 right-0 top-0 z-100"
                >
                  <span className="sr-only">Open menu</span>
                  <Plus className="h-4 w-4 absolute" />
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[1000px]">
                <DialogHeader>
                  <DialogTitle>Create New Plan</DialogTitle>
                  <DialogDescription>
                    Choose the items you want to display
                  </DialogDescription>
                  <DialogClose />
                </DialogHeader>

                {/* Plan Form for creating new Plan */}
                <PlanForm onCloseForm={() => setOpenAdd(false)}/>
              </DialogContent>
            </Dialog>
          </div>
          <div className="relative">
            {plans.map((plan) => (
              <div className="relative z-0" key={plan.id}>
                <SelectItem value={plan.id}>{plan.name}</SelectItem>
                <Dialog open={openEdit} onOpenChange={setOpenEdit}>
                  <DialogTrigger asChild>
                    <Button
                      variant="ghost"
                      className="absolute h-8 w-8 right-0 top-0 z-100"
                    >
                      <span className="sr-only">Open menu</span>
                      <MoreVertical className="h-4 w-4 absolute" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[1000px]">
                    <DialogHeader>
                      <DialogTitle>Edit Plan {plan.name}</DialogTitle>
                      <DialogDescription>
                        Edit the items you want to display
                      </DialogDescription>
                      <DialogClose />
                    </DialogHeader>

                    {/* Plan Form for editting Plan */}
                    <PlanForm editPlanData={plan} onCloseForm={() => setOpenEdit(false)}/>
                  </DialogContent>
                </Dialog>
              </div>
            ))}
          </div>
          {plans.length === 0 && 'No plans available'}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default SelectPlanToDisplay;
