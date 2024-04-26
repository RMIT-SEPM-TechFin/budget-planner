'use client';

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

import EditItemForm from './EditItemForm';

const AddItemButton: FC<{ className?: string }> = ({ className }) => {
  const [openForm, setOpenForm] = useState(false);

  return (
    <Dialog open={openForm} onOpenChange={setOpenForm}>
      <DialogTrigger asChild>
        <Button className={className} onClick={() => setOpenForm(true)}>
          New Item
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Item</DialogTitle>
          <DialogDescription>Add the item details below</DialogDescription>
          <DialogClose />
        </DialogHeader>
        <EditItemForm onCloseForm={() => setOpenForm(false)} />
      </DialogContent>
    </Dialog>
  );
};

export default AddItemButton;
