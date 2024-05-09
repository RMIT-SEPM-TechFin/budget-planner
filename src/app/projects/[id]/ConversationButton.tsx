'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { EllipsisVertical, MessageCircle, SendHorizonal } from 'lucide-react';
import { FC, useCallback, useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import ActionIconButton from '@/components/ActionIconButton';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Form, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import useAuth from '@/hooks/useAuth';
import useNotification from '@/hooks/useNotification';
import { cn } from '@/lib/utils';
import type { Chat } from '@/types';

import { addChat, deleteChat } from './actions';
import { useRealtimeChat } from './hooks';

interface ConversationButtonProps {
  projectId: string;
}

const schema = z.object({
  text: z.string().min(1, 'Text cannot be empty'),
});

const ConversationButton: FC<ConversationButtonProps> = ({ projectId }) => {
  const { user } = useAuth();
  const { showNotification } = useNotification();
  const { chats } = useRealtimeChat(projectId);
  const [_, startTransition] = useTransition();

  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      text: '',
    },
  });

  const { reset } = form;

  const onAddChat = useCallback(
    ({ text }: z.infer<typeof schema>) => {
      startTransition(async () => {
        try {
          await addChat(projectId, user?.name ?? '', user?.email ?? '', text);
          reset();
        } catch {
          showNotification({
            title: 'Failed to create new chat',
            variant: 'failure',
          });
        }
      });
    },
    [
      startTransition,
      user?.name,
      reset,
      user?.email,
      projectId,
      showNotification,
    ],
  );

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <ActionIconButton
          Icon={MessageCircle}
          tooltip="View Conversation"
          onClick={() => setOpen(true)}
        />
      </SheetTrigger>
      <SheetContent className="p-0 flex flex-col h-screen">
        <SheetHeader className="p-4 pb-0 space-y-2">
          <SheetTitle className="text-center">Conversation</SheetTitle>
        </SheetHeader>
        <Separator />
        <div className="relative flex-1 p-4 pt-0 flex flex-col gap-4">
          <div className="flex-1 flex flex-col gap-1 h-full overflow-y-auto mb-14">
            {chats.map((chat) => (
              <ChatItem
                key={chat.id}
                projectId={projectId}
                chat={chat}
                isAuthor={chat.authorEmail === user?.email}
              />
            ))}
          </div>
          <div className="w-[calc(100%-32px)] absolute bottom-4">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onAddChat)}
                className="w-full bottom-0 flex gap-2"
              >
                <FormField
                  control={form.control}
                  name="text"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <div className="flex items-center gap-2">
                        <Input id="text" className="flex-1" {...field} />
                        <Button size="icon">
                          <SendHorizonal type="submit" size={16} />
                        </Button>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </form>
            </Form>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default ConversationButton;

interface ChatItemProps {
  projectId: string;
  chat: Chat;
  isAuthor: boolean;
}

const ChatItem: FC<ChatItemProps> = ({ projectId, chat, isAuthor }) => {
  const [_, startTransition] = useTransition();
  const { showNotification } = useNotification();
  const [showActionIcon, setShowActionIcon] = useState(false);

  const onDeleteChat = useCallback(() => {
    startTransition(async () => {
      try {
        await deleteChat(projectId, chat.id);
        showNotification({
          title: 'Chat deleted successfully',
          variant: 'success',
        });
      } catch {
        showNotification({
          title: 'Failed to delete chat',
          variant: 'failure',
        });
      }
    });
  }, [projectId, chat.id, startTransition, showNotification]);

  return (
    <div
      onMouseEnter={() => setShowActionIcon(true)}
      onMouseLeave={() => setShowActionIcon(false)}
      className={cn('flex flex-col gap-0.5', isAuthor ? 'items-end' : '')}
    >
      {!isAuthor && <small>{chat.authorName}</small>}
      <div className="max-w-[65%] flex gap-1 items-center">
        <DropdownMenu key={chat.id}>
          {isAuthor && showActionIcon ? (
            <>
              <DropdownMenuTrigger>
                <EllipsisVertical
                  size={16}
                  className="fill-muted-foreground cursor-pointer"
                />
              </DropdownMenuTrigger>
              <DropdownMenuContent
                onMouseEnter={() => setShowActionIcon(true)}
                onMouseLeave={() => setShowActionIcon(false)}
              >
                <DropdownMenuItem onClick={onDeleteChat}>
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </>
          ) : (
            isAuthor && <div className={cn('w-4 aspect-square')} />
          )}
        </DropdownMenu>
        <div
          className={cn(
            'rounded-2xl py-2 px-3',
            isAuthor ? 'flex-1 bg-primary' : 'border border-black',
          )}
        >
          <small
            className={cn('block', isAuthor ? 'text-white' : 'text-black')}
          >
            {chat.text}
          </small>
        </div>
      </div>
    </div>
  );
};
