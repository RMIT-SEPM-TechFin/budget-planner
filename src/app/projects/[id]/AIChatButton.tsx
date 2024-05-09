'use client';

import { Bot } from 'lucide-react';
import { FC, useState } from 'react';

import ActionIconButton from '@/components/ActionIconButton';
import AIChatBox from '@/components/ui/AIChatBox';

import { useProject } from './context';

const AIChatButton: FC<{}> = () => {
  const { projectId } = useProject();
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
