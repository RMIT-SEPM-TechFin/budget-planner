'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { User, X } from 'lucide-react';
import { FC, useCallback, useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import ActionIconButton from '@/components/ActionIconButton';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import useNotification from '@/hooks/useNotification';

import { updateProjectMembers } from './actions';

interface ManageMembersButtonProps {
  projectId: string;
  initialMembers: string[];
}

const schema = z.object({
  email: z.string().email(),
});

const ManageMembersButton: FC<ManageMembersButtonProps> = ({
  projectId,
  initialMembers,
}) => {
  const [_, startTransition] = useTransition();
  const { showNotification } = useNotification();

  const [open, setOpen] = useState(false);
  const [members, setMembers] = useState(initialMembers);

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: '',
    },
  });

  const { reset } = form;

  const onAddMember = useCallback(
    ({ email }: z.infer<typeof schema>) => {
      // TODO: check if email is already in members
      setMembers((prev) => [...prev, email]);
      reset();
    },
    [reset],
  );

  const onRemoveMember = (member: string) => {
    setMembers((prev) => prev.filter((m) => m !== member));
  };

  const onUpdateMembers = useCallback(() => {
    startTransition(async () => {
      try {
        // TODO: only owner can update or delete members
        await updateProjectMembers(projectId, members);
        showNotification({
          title: 'Members updated successfully',
          variant: 'success',
        });
        setOpen(false);
      } catch (error) {
        showNotification({
          title: 'Failed to update members',
          variant: 'failure',
        });
      }
    });
  }, [members, projectId, showNotification, startTransition]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <ActionIconButton
          Icon={User}
          tooltip="Manage Members"
          onClick={() => setOpen(true)}
        />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Manage Members</DialogTitle>
          <DialogClose />
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onAddMember)}
            className="grid gap-2"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center gap-3">
                    <FormLabel htmlFor="name">Email</FormLabel>
                    <Input
                      id="email"
                      className="flex-1"
                      placeholder="Email"
                      {...field}
                    />
                    <Button type="submit" variant="secondary">
                      Add
                    </Button>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
        <div className="flex items-center flex-wrap gap-1">
          {members.map((member) => (
            <Badge
              key={member}
              variant="outline"
              className="flex items-center gap-1"
            >
              <p>{member}</p>
              <X
                size={12}
                className="cursor-pointer"
                onClick={() => onRemoveMember(member)}
              />
            </Badge>
          ))}
        </div>
        <DialogFooter>
          <Button onClick={onUpdateMembers}>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ManageMembersButton;
