'use client';

import { Message } from 'ai';
import { useChat } from 'ai/react';
import { Bot, SendHorizontal, Trash, X } from 'lucide-react';
import { useEffect, useMemo, useRef } from 'react';

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
  } = useChat({
    body: {
      projectId,
    },
  });

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

  const lastMessageIsUser = useMemo(
    () => messages[messages.length - 1]?.role === 'user',
    [messages],
  );

  return (
    <div
      className={cn(
        'relative bottom-0 right-0 z-10 w-full max-w-[500px] p-1 xl:right-36',
        open ? 'fixed' : 'hidden',
      )}
    >
      <Button
        onClick={onClose}
        variant="ghost"
        size="icon"
        className="absolute right-3 top-3"
      >
        <X size={20} className="stroke-muted-foreground" />
      </Button>
      <div className="flex h-[600px] flex-col border bg-background shadow-xl rounded-xl pt-11">
        <div className="mt-3 h-full overflow-y-auto px-3" ref={scrollRef}>
          {messages.map((message) => (
            <ChatMessage message={message} key={message.id} />
          ))}
          {isLoading && lastMessageIsUser && (
            <ChatMessage
              message={{
                role: 'assistant',
                content: '...',
              }}
            />
          )}
          {error && (
            <ChatMessage
              message={{
                role: 'assistant',
                content: 'Something went wrong. Please try again.',
              }}
            />
          )}
          {!error && messages.length === 0 && (
            <div className="flex h-full items-center justify-center gap-2">
              <Bot className="stroke-muted-foreground" />
              <p className="text-muted-foreground">Ask AI</p>
            </div>
          )}
        </div>
        <form onSubmit={handleSubmit} className="m-3 flex gap-1.5">
          <Button
            title="Clear chat"
            variant="outline"
            size="icon"
            className="shrink-0"
            type="button"
            onClick={() => setMessages([])}
          >
            <Trash size={16} />
          </Button>
          <Input
            value={input}
            onChange={handleInputChange}
            placeholder="Type something..."
            ref={inputRef}
            className="flex-1"
          />
          <Button type="submit" size="icon">
            <SendHorizontal size={16} />
          </Button>
        </form>
      </div>
    </div>
  );
}

function ChatMessage({
  message: { role, content },
}: {
  message: Pick<Message, 'role' | 'content'>;
}) {
  const isAiMessage = role === 'assistant';

  return (
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
    </div>
  );
}
