'use client';

import { Bot } from 'lucide-react';
import { FC, useState } from 'react';

import AIChatBox from '@/components/ui/AIChatBox';
import { Button } from '@/components/ui/button';

const AIChatButton: FC<{
  className?: string;
  projectId: string;
}> = ({ className, projectId }) => {
  const [chatBoxOpen, setChatBoxOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setChatBoxOpen(true)}>
        <Bot size={20} className="mr-2" />
        AI Chat
      </Button>
      <AIChatBox
        projectId={projectId}
        open={chatBoxOpen}
        onClose={() => setChatBoxOpen(false)}
      />
    </>
  );
};

export default AIChatButton;
