'use client';

import { Bot } from 'lucide-react';
import { FC, useState } from 'react';

import ActionIconButton from '@/components/ActionIconButton';

import AIChatBox from './AIChatBox';

const AIChatButton: FC<{}> = () => {
  const [chatBoxOpen, setChatBoxOpen] = useState(false);
  return (
    <>
      <ActionIconButton
        onClick={() => setChatBoxOpen(true)}
        tooltip="AI Chatbox"
        Icon={Bot}
      />
      <AIChatBox open={chatBoxOpen} onClose={() => setChatBoxOpen(false)} />
    </>
  );
};

export default AIChatButton;
