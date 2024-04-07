'use client';

import { Check, X } from 'lucide-react';
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
import useAuth from '@/hooks/useAuth';
import useNotification from '@/hooks/useNotification';
import { cn } from '@/lib/utils';

import { saveNewProject } from './actions';

const AddProjectButton: FC<{ className?: string }> = ({ className }) => {
  const { user } = useAuth();
  const { showNotification } = useNotification();

  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [members, setMembers] = useState<string[]>([]);
  const [memberEmailValue, setMemberEmailValue] = useState('');

  const [_, startTransition] = useTransition();

  const setInitialState = useCallback(() => {
    setMembers([]);
    setMemberEmailValue('');
  }, []);

  const onAddMember = useCallback(() => {
    setMembers([...members, memberEmailValue]);
    setMemberEmailValue('');
  }, [members, memberEmailValue]);

  const onRemoveMember = useCallback(
    (email: string) => {
      setMembers(members.filter((member) => member !== email));
    },
    [members],
  );

  const handleSaveNewProject = useCallback(() => {
    if (!user) return;
    startTransition(() => {
      try {
        saveNewProject({
          name,
          // Remove duplicates + add owner emails into members list
          members: Array.from(new Set([...members, user.email])),
          ownerEmail: user.email,
          ownerName: user.name,
        });
        setOpen(false);
        showNotification({
          title: 'New Project Created',
          variant: 'success',
        });
        setInitialState();
        // TODO: navigate to the new project page
      } catch {
        showNotification({
          title: 'Failed to create new project',
          variant: 'failure',
        });
      }
    });
  }, [members, name, setInitialState, showNotification, startTransition, user]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className={className} onClick={() => setOpen(true)}>
          New Project
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Project</DialogTitle>
          <DialogDescription>
            Add the name and members of the project below
          </DialogDescription>
          <DialogClose />
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="project-name" className="text-right">
              Name
            </Label>
            {/* TODO: input turns white when selecting existing option */}
            <Input
              id="project-name"
              className="col-span-3"
              placeholder="New Project"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-x-4">
            <Label htmlFor="project-member-email" className="text-right">
              Member Email
            </Label>
            <div className="relative col-span-3">
              {/* TODO: input turns white when selecting existing option */}
              <Input
                id="project-member-email"
                placeholder="john123@gmail.com"
                value={memberEmailValue}
                onChange={(e) => {
                  setMemberEmailValue(e.target.value);
                }}
              />
              <Button
                variant="ghost"
                className="absolute right-0 top-0"
                onClick={onAddMember}
              >
                <Check size={16} className="stroke-muted-foreground" />
              </Button>
            </div>
            <div />
            {members.length === 0 && (
              <small className="col-span-3 mt-1">
                You can add members later!
              </small>
            )}
            {members.map((member, idx) => (
              <div
                key={idx}
                className={cn(
                  'col-start-2 mt-1 space-y-1 col-span-3',
                  'flex justify-between items-center',
                )}
              >
                <p className="text-sm text-muted-foreground">
                  {idx + 1}. {member}
                </p>
                <X
                  size={14}
                  className="stroke-muted-foreground"
                  onClick={() => onRemoveMember(member)}
                />
              </div>
            ))}
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleSaveNewProject} disabled={!name}>
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddProjectButton;
