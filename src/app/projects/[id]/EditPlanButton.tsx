'use client';

import type { LucideIcon } from 'lucide-react';
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
import { Plan } from '@/types';

import EditPlanForm from './EditPlanForm';

interface EditPlanButtonProps {
  Icon: LucideIcon;
  plan?: Plan;
}

const EditPlanButton: FC<EditPlanButtonProps> = ({ Icon, plan }) => {
  const [openEditPlan, setOpenEditPlan] = useState(false);

  return (
    <Dialog open={openEditPlan} onOpenChange={setOpenEditPlan}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className="absolute h-8 w-8 right-0 top-0 z-100"
        >
          <span className="sr-only">Open edit plan</span>
          <Icon className="h-4 w-4 absolute" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[1000px] overflow-y-scroll max-h-[85vh]">
        <DialogHeader>
          <DialogTitle>
            {!plan ? 'Create New Plan' : `Edit Plan ${plan.name}`}
          </DialogTitle>
          <DialogDescription>
            {`${!plan ? 'Add' : 'Edit'} the items you want to display`}
          </DialogDescription>
          <DialogClose />
        </DialogHeader>

        {/* Plan Form for creating new Plan */}
        <EditPlanForm
          editPlanData={plan}
          onCloseForm={() => setOpenEditPlan(false)}
        />
      </DialogContent>
    </Dialog>
  );
};

export default EditPlanButton;
