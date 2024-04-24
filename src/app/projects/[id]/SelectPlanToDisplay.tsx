'use client';

import { FC } from 'react';

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

interface SelectPlanProps {
  plans: Plan[];
}

const SelectPlanToDisplay: FC<SelectPlanProps> = ({ plans }) => {
  const { planId, setPlanId } = usePlanIdQueryParam();

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
          <SelectLabel>Plans</SelectLabel>
          {plans.map((plan) => (
            <SelectItem value={plan.id} key={plan.id}>
              {plan.name}
            </SelectItem>
          ))}
          {plans.length === 0 && 'No plans available'}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default SelectPlanToDisplay;
