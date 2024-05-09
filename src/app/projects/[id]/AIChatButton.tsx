'use client';

import { Bot } from 'lucide-react';
import { FC, useState } from 'react';

import ActionIconButton from '@/components/ActionIconButton';
import AIChatBox from '@/components/ui/AIChatBox';

const AIChatButton: FC<{
  className?: string;
  projectId: string;
}> = ({ className, projectId }) => {
  const [chatBoxOpen, setChatBoxOpen] = useState(false);
  return (
    <>
      <ActionIconButton
        onClick={() => setChatBoxOpen(true)}
        tooltip="AI Chatbox"
        Icon={Bot}
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
