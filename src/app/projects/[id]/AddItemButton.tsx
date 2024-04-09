'use client';
import { FC, useState, useTransition } from 'react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import useNotification from '@/hooks/useNotification';

import SelectCategory from './SelectCategory';

const AddItemButton: FC<{ className?: string }> = ({ className }) => {
  const { showNotification } = useNotification();
  const [_, startTransition] = useTransition();

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
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="category">Select</Label>
            {/* TODO: input turns white when selecting existing option */}

            <SelectCategory name="category" className="col-span-3" />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="item-name">Name</Label>
            {/* TODO: input turns white when selecting existing option */}
            <Input
              id="item-name"
              className="col-span-3"
              placeholder="New Item"
            />
          </div>

          <div className="flex-col flex items-start gap-4">
            <Label htmlFor="item-description" className="col-span-4 ">
              Description
            </Label>

            <Textarea
              id="item-description"
              name="item-description"
              placeholder="Type the item description"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="price">Price</Label>
            <Input
              id="price"
              className="col-span-3"
              placeholder="Price"
              type="number"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="Quantity">Quantity</Label>
            <Input
              id="Quantity"
              className="col-span-3"
              placeholder="Quantity"
              type="number"
            />
          </div>
        </div>

        <DialogFooter>
          <Button type="submit">Add</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddItemButton;
