'use client';
import { FC, useCallback, useState, useTransition } from 'react';

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

import { saveNewItem } from './actions';
import SelectCategory from './SelectCategory';

const AddItemButton: FC<{ className?: string; projectId: string }> = ({
  className,
  projectId,
}) => {
  const { showNotification } = useNotification();
  const [_, startTransition] = useTransition();

  const [open, setOpen] = useState(false);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(0);
  const [category, setCategory] = useState('');

  const handleSaveNewItem = useCallback(() => {
    startTransition(() => {
      try {
        saveNewItem(projectId, {
          category: category,
          description: description,
          name: name,
          price: price,
          quantity: quantity,
        });
        setOpen(false);
        showNotification({
          title: 'New Item Created',
          variant: 'success',
        });
      } catch {
        showNotification({
          title: 'Failed to create new Item',
          variant: 'failure',
        });
      }
    });
  }, [
    projectId,
    category,
    name,
    description,
    price,
    quantity,
    showNotification,
    startTransition,
  ]);

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
              name="name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </div>

          <div className="flex-col flex items-start gap-4">
            <Label htmlFor="item-description" className="col-span-4 ">
              Description
            </Label>

            <Textarea
              id="item-description"
              name="description"
              placeholder="Type the item description"
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="price">Price</Label>
            <Input
              id="price"
              className="col-span-3"
              placeholder="Price"
              type="number"
              name="price"
              value={price}
              onChange={(e) => {
                setPrice(Number(e.target.value));
              }}
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="Quantity">Quantity</Label>
            <Input
              id="Quantity"
              className="col-span-3"
              placeholder="Quantity"
              type="number"
              name="quantity"
              value={quantity}
              onChange={(e) => {
                setQuantity(Number(e.target.value));
              }}
            />
          </div>
        </div>

        <DialogFooter>
          <Button type="submit" onClick={handleSaveNewItem}>
            Add
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddItemButton;
