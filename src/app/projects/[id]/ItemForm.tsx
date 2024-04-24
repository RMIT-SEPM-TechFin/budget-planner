import { zodResolver } from '@hookform/resolvers/zod';
import { FC, useCallback, useMemo, useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import useNotification from '@/hooks/useNotification';
import type { Item, Plan } from '@/types';

import { addItem, saveItem } from './actions';
import { useProject } from './context';
import SelectCategory from './SelectCategory';
import SelectPlansForItem from './SelectPlansForItem';

interface ItemFormProps {
  editItemData?: Item;
  onCloseForm?: () => void;
}

const schema = z.object({
  category: z.string().min(1, {
    message: 'Category is required',
  }),
  name: z.string().min(1, {
    message: 'Name is required',
  }),
  description: z.string(),
  price: z.coerce.number().positive('Price must be a positive number'),
  quantity: z.coerce.number().positive('Quantity must be a positive number'),
});

const ItemForm: FC<ItemFormProps> = ({ editItemData, onCloseForm }) => {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      category: editItemData?.category,
      name: editItemData?.name,
      description: editItemData?.description,
      price: editItemData?.price,
      quantity: editItemData?.quantity,
    },
  });

  const { reset } = form;
  const [_, startTransition] = useTransition();
  const { showNotification } = useNotification();
  const { projectId, plans } = useProject();

  const initialPlans = useMemo(() => {
    if (!editItemData) return [];
    return plans.filter((plan) => plan.items.includes(editItemData.id));
  }, [editItemData, plans]);

  const [selectedPlans, setSelectedPlans] = useState<Plan[]>(initialPlans);

  const selectedPlansIds = useMemo(
    () => selectedPlans.map((plan) => plan.id),
    [selectedPlans],
  );

  const onAddNewItem = useCallback(
    (data: z.infer<typeof schema>) => {
      startTransition(() => {
        try {
          addItem(projectId, data as Item, selectedPlansIds);
          onCloseForm && onCloseForm();
          reset();
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
    },
    [projectId, selectedPlansIds, reset, showNotification, onCloseForm],
  );

  const onUpdateItem = useCallback(
    (data: z.infer<typeof schema>) => {
      startTransition(() => {
        try {
          saveItem(
            projectId,
            editItemData?.id ?? '',
            data as Item,
            initialPlans.map((plan) => plan.id),
            selectedPlansIds,
          );
          onCloseForm && onCloseForm();
          reset();
          showNotification({
            title: 'Item updated',
            variant: 'success',
          });
        } catch {
          showNotification({
            title: 'Failed to update item',
            variant: 'failure',
          });
        }
      });
    },
    [
      projectId,
      editItemData,
      showNotification,
      initialPlans,
      selectedPlansIds,
      onCloseForm,
      reset,
    ],
  );

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(
          !editItemData ? onAddNewItem : onUpdateItem,
        )}
        className="grid gap-2 h-max"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <div className="grid grid-cols-4 items-center gap-4">
                <FormLabel htmlFor="name">Name</FormLabel>
                <Input
                  id="name"
                  className="col-span-3"
                  placeholder="New Item"
                  {...field}
                />
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <div className="grid grid-cols-4 items-center gap-4">
                <FormLabel htmlFor="category">Category</FormLabel>
                <SelectCategory
                  fieldOnChange={field.onChange}
                  defaultValue={editItemData?.category}
                  className="col-span-3"
                />
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem className="grid grid-cols-4 gap-4">
              <FormLabel htmlFor="description" className="mt-2">
                Description
              </FormLabel>
              <Textarea
                id="description"
                placeholder="Type the item description"
                className="col-span-3"
                {...field}
              />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <div className="grid grid-cols-4 items-center gap-4">
                <FormLabel htmlFor="price">Price</FormLabel>
                <Input
                  id="price"
                  className="col-span-3"
                  placeholder="Price"
                  type="number"
                  {...field}
                />
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="quantity"
          render={({ field }) => (
            <FormItem>
              <div className="grid grid-cols-4 items-center gap-4">
                <FormLabel htmlFor="quantity">Quantity</FormLabel>
                <Input
                  id="quantity"
                  className="col-span-3"
                  defaultValue={editItemData && editItemData.quantity}
                  placeholder="Quantity"
                  type="number"
                  {...field}
                />
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-4 gap-4">
          <FormLabel htmlFor="description" className="mt-2">
            Plans
          </FormLabel>
          <SelectPlansForItem
            allPlans={plans}
            selectedPlans={selectedPlans}
            setSelectedPlans={setSelectedPlans}
            className="col-span-3"
          />
        </div>

        <Button type="submit">{editItemData ? 'Save' : 'Add'}</Button>
      </form>
    </Form>
  );
};

export default ItemForm;
