'use client';

import { MoreVertical, Plus } from 'lucide-react';
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

import { useProject } from './context';
import EditPlanButton from './EditPlanButton';
import { usePlanIdQueryParam } from './hooks';

interface SelectPlanProps {
  classname?: string;
}

const SelectPlanToDisplay: FC<SelectPlanProps> = ({ classname }) => {
  const { plans } = useProject();
  const { planId, setPlanId } = usePlanIdQueryParam();

  return (
    <Select
      onValueChange={(value) => {
        setPlanId(value === 'all' ? undefined : value);
      }}
      value={planId ?? 'all'}
    >
      <SelectTrigger className={classname}>
        <SelectValue placeholder="Select a plan" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All Items</SelectItem>
        <SelectSeparator />
        <SelectGroup>
          <div className="relative">
            <SelectLabel>Plans</SelectLabel>
            <EditPlanButton Icon={Plus} />
          </div>
          <div className="relative">
            {plans.map((plan) => {
              return (
                <div className="relative z-0" key={plan.id}>
                  <SelectItem value={plan.id}>{plan.name}</SelectItem>
                  <EditPlanButton Icon={MoreVertical} plan={plan} />
                </div>
              );
            })}
          </div>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default SelectPlanToDisplay;
