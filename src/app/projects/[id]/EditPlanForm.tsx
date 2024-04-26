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

import { addPlan, deletePlan, updatePlan } from './actions';
import { useProject } from './context';
import { usePlanIdQueryParam } from './hooks';
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
  const [_, startTransition] = useTransition();
  const { showNotification } = useNotification();
  const { projectId } = useProject();
  const { setPlanId } = usePlanIdQueryParam();

  const { reset, setValue } = form;

  const onAddPlan = useCallback(
    (data: z.infer<typeof schema>) => {
      startTransition(async () => {
        try {
          const newPlanId = await addPlan(projectId, data.name, data.items);
          onCloseForm && onCloseForm();
          reset();
          showNotification({
            title: 'Plan added successfully',
            variant: 'success',
          });
          // navigate to the new plan
          setPlanId(newPlanId);
        } catch (error) {
          console.error(error);
          showNotification({
            title: 'Failed to add plan',
            variant: 'failure',
          });
        }
      });
    },
    [projectId, showNotification, reset, onCloseForm, setPlanId],
  );

  const onUpdatePlan = useCallback(
    (data: z.infer<typeof schema>) => {
      startTransition(async () => {
        try {
          await updatePlan(
            projectId,
            editPlanData?.id ?? '',
            data.name,
            data.items,
          );
          onCloseForm && onCloseForm();
          reset();
          showNotification({
            title: 'Plan saved successfully',
            variant: 'success',
          });
          // navigate to the updated plan
          setPlanId(editPlanData?.id);
        } catch (error) {
          console.error(error);
          showNotification({
            title: 'Failed to save plan',
            variant: 'failure',
          });
        }
      });
    },
    [projectId, showNotification, reset, onCloseForm, editPlanData, setPlanId],
  );

  const onDeletePlan = useCallback(() => {
    startTransition(() => {
      try {
        deletePlan(projectId, editPlanData?.id ?? '');
        onCloseForm && onCloseForm();
        reset();
        showNotification({
          title: 'Plan deleted successfully',
          variant: 'success',
        });
        // navigate back to all items
        setPlanId(undefined);
      } catch (error) {
        console.error(error);
        showNotification({
          title: 'Failed to delete plan',
          variant: 'failure',
        });
      }
    });
  }, [
    projectId,
    showNotification,
    reset,
    onCloseForm,
    editPlanData,
    setPlanId,
  ]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(editPlanData ? onUpdatePlan : onAddPlan)}
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
                  placeholder="Name"
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
            <Button type="button" variant="outline" onClick={onDeletePlan}>
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
