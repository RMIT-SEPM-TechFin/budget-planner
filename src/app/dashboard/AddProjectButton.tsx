'use client';

import { Plus, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { FC, useCallback, useState, useTransition } from 'react';

import { Badge } from '@/components/ui/badge';
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

import { saveNewProject } from './actions';

const AddProjectButton: FC<{ className?: string }> = ({ className }) => {
  const router = useRouter();
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

  const onOpenChange = useCallback(
    (open: boolean) => {
      if (!open) {
        setInitialState();
      }
      setOpen(open);
    },
    [setInitialState],
  );

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
    startTransition(async () => {
      try {
        const newProjectId = await saveNewProject({
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
        router.push(`/projects/${newProjectId}`);
      } catch {
        showNotification({
          title: 'Failed to create new project',
          variant: 'failure',
        });
      }
    });
  }, [
    members,
    name,
    setInitialState,
    showNotification,
    startTransition,
    user,
    router,
  ]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button className={className} onClick={() => setOpen(true)}>
          New Project
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
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
              {/* TODO: form validator */}
              <div className="flex items-center gap-1">
                <Input
                  id="project-member-email"
                  placeholder="john123@gmail.com"
                  value={memberEmailValue}
                  onChange={(e) => {
                    setMemberEmailValue(e.target.value);
                  }}
                />
                <Button variant="outline" size="icon" onClick={onAddMember}>
                  <Plus size={16} className="stroke-muted-foreground" />
                </Button>
              </div>
            </div>
            <div />
            {members.length === 0 && (
              <small className="col-span-3 mt-1">
                You can add members later!
              </small>
            )}
            <div className="mt-2 col-span-3 flex flex-wrap gap-1">
              {members.map((member) => (
                <Badge
                  key={member}
                  variant="secondary"
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
