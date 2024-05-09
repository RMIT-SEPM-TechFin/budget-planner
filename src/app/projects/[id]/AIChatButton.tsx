'use client';

import { Bot } from 'lucide-react';
import { FC, useState } from 'react';

import AIChatBox from '@/components/ui/AIChatBox';
import { Button } from '@/components/ui/button';
import ActionIconButton from '@/components/ActionIconButton';

const AIChatButton: FC<{
  className?: string;
  projectId: string;
}> = ({ className, projectId }) => {
  const [chatBoxOpen, setChatBoxOpen] = useState(false);
  return (
    <>
      <ActionIconButton
      Icon={Bot}
      onClick={() => setChatBoxOpen(true)}
      tooltip="AI Chatbox"
    />
      <AIChatBox
        projectId={projectId}
        open={chatBoxOpen}
        onClose={() => setChatBoxOpen(false)}
      />
    </>
  );
};

export default AIChatButton;
