import { zodResolver } from '@hookform/resolvers/zod';
import { FC, useCallback, useTransition } from 'react';
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
import useNotification from '@/hooks/useNotification';
import { Plan } from '@/types';

import { addPlan, deletePlan, savePlan } from './actions';
import { useProject } from './context';
import SelectItemsForPlan from './SelectItemsForPlan';

interface EditPlanFormProps {
  editPlanData?: Plan;
  onCloseForm?: () => void;
}

const schema = z.object({
  name: z.string(),
  items: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: 'You have to select at least one item.',
  }),
});

const EditPlanForm: FC<EditPlanFormProps> = ({ editPlanData, onCloseForm }) => {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: editPlanData?.name,
      items: editPlanData ? editPlanData.items : [''],
    },
  });
  const { projectId } = useProject();
  const [_, startTransition] = useTransition();
  const { showNotification } = useNotification();

  const { reset, setValue } = form;

  const onAddPlan = useCallback(
    (data: z.infer<typeof schema>) => {
      startTransition(() => {
        try {
          addPlan(projectId, data.name, data.items);
          onCloseForm && onCloseForm();
          reset();
          showNotification({
            title: 'Plan added successfully',
            variant: 'success',
          });
        } catch (error) {
          console.error(error);
          showNotification({
            title: 'Failed to add plan',
            variant: 'failure',
          });
        }
      });
    },
    [projectId, showNotification, reset, onCloseForm],
  );

  const onSavePlan = useCallback(
    (data: z.infer<typeof schema>) => {
      startTransition(() => {
        try {
          savePlan(projectId, editPlanData?.id ?? '', data.name, data.items);
          onCloseForm && onCloseForm();
          reset();
          showNotification({
            title: 'Plan saved successfully',
            variant: 'success',
          });
        } catch (error) {
          console.error(error);
          showNotification({
            title: 'Failed to save plan',
            variant: 'failure',
          });
        }
      });
    },
    [projectId, showNotification, reset, onCloseForm, editPlanData],
  );

  const onDeletPlan = useCallback(() => {
    startTransition(() => {
      try {
        deletePlan(projectId, editPlanData?.id ?? '');
        onCloseForm && onCloseForm();
        reset();
        showNotification({
          title: 'Plan deleted successfully',
          variant: 'success',
        });
      } catch (error) {
        console.error(error);
        showNotification({
          title: 'Failed to delete plan',
          variant: 'failure',
        });
      }
    });
  }, [projectId, showNotification, reset, onCloseForm, editPlanData]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(editPlanData ? onSavePlan : onAddPlan)}
        className="grid gap-2"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <div className="grid grid-cols-10 items-center gap-4">
                <FormLabel htmlFor="name">Name</FormLabel>
                <Input
                  id="name"
                  className="col-span-9"
                  placeholder="New Item"
                  {...field}
                />
              </div>
              {/* <FormMessage /> */}
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="items"
          render={({ field }) => (
            <FormItem>
              <SelectItemsForPlan
                defaultValue={field.value}
                formControl={form.control}
                setValue={setValue}
              />
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="space-x-2">
          {editPlanData && (
            <Button type="button" variant="outline" onClick={onDeletPlan}>
              Delete
            </Button>
          )}
          <Button type="submit">{editPlanData ? 'Save' : 'Add'}</Button>
        </div>
      </form>
    </Form>
  );
};

export default EditPlanForm;
