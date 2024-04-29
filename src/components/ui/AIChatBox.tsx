'use client';

import { Message } from 'ai';
import { useChat } from 'ai/react';
import { Bot, Trash, XCircle } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useRef } from 'react';

import { cn } from '@/lib/utils';

import { Button } from './button';
import { Input } from './input';

interface AIChatBoxProps {
  open: boolean;
  onClose: () => void;
  projectId: string;
}

export default function AIChatBox({
  projectId,
  open,
  onClose,
}: AIChatBoxProps) {
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    setMessages,
    isLoading,
    error,
  } = useChat();
  console.log('projectId:', projectId);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (open) {
      inputRef.current?.focus();
    }
  }, [open]);

  const lastMessageIsUser = messages[messages.length - 1]?.role === 'user';

  return (
    <div
      className={cn(
        'bottom-0 right-0 z-10 w-full max-w-[500px] p-1 xl:right-36',
        open ? 'fixed' : 'hidden',
      )}
    >
      <button onClick={onClose} className="mb-1 ms-auto block">
        <XCircle size={30} />
      </button>
      <div className="flex h-[600px] flex-col rounded border bg-background shadow-xl">
        <div className="mt-3 h-full overflow-y-auto px-3" ref={scrollRef}>
          {messages.map((message) => (
            <ChatMessage
              projectId={projectId}
              message={message}
              key={message.id}
            />
          ))}
          {isLoading && lastMessageIsUser && (
            <ChatMessage
              projectId={projectId}
              message={{
                role: 'assistant',
                content: 'Thinking...',
              }}
            />
          )}
          {error && (
            <ChatMessage
              projectId={projectId}
              message={{
                role: 'assistant',
                content: 'Something went wrong. Please try again.',
              }}
            />
          )}
          {!error && messages.length === 0 && (
            <div className="flex h-full items-center justify-center gap-3">
              <Bot />
              Ask the AI a question about your items
            </div>
          )}
        </div>
        <form onSubmit={handleSubmit} className="m-3 flex gap-1">
          <Button
            title="Clear chat"
            variant="outline"
            size="icon"
            className="shrink-0"
            type="button"
            onClick={() => setMessages([])}
          >
            <Trash />
          </Button>
          <Input
            value={input}
            onChange={handleInputChange}
            placeholder="Say something..."
            ref={inputRef}
          />
          <Button type="submit">Send</Button>
        </form>
      </div>
    </div>
  );
}

function ChatMessage({
  projectId,
  message: { role, content },
}: {
  projectId: string;
  message: Pick<Message, 'role' | 'content'>;
}) {
  console.log('projectId1:', projectId);
  const isAiMessage = role === 'assistant';

  return (
    // <ProjectContextProvider
    // projectId={id}
    // categories={categories}
    // items={items}
    // plans={plans}
    //  >
    <div
      className={cn(
        'mb-3 flex items-center',
        isAiMessage ? 'me-5 justify-start' : 'ms-5 justify-end',
      )}
    >
      {isAiMessage && <Bot className="mr-2 shrink-0" />}
      <p
        className={cn(
          'whitespace-pre-line rounded-md border px-3 py-2',
          isAiMessage ? 'bg-background' : 'bg-primary text-primary-foreground',
        )}
      >
        {content}
      </p>
      {/* {!isAiMessage && user?.imageUrl && (
        <Image
          src={user.imageUrl}
          alt="User image"
          width={100}
          height={100}
          className="ml-2 h-10 w-10 rounded-full object-cover"
        />
      )} */}
    </div>
    // </ProjectContextProvider>
  );
}
