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
import { Category } from '@/types';

import ItemForm from './ItemForm';

const AddItemButton: FC<{ className?: string; categories: Category[] }> = ({
  className,
  categories,
}) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className={className} onClick={() => setOpen(true)}>
          New Item
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Item</DialogTitle>
          <DialogDescription>Add the item details below</DialogDescription>
          <DialogClose />
        </DialogHeader>
        <ItemForm categories={categories} />
      </DialogContent>
    </Dialog>
  );
};

export default AddItemButton;
