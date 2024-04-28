'use client';

import { LucideIcon } from 'lucide-react';
import { FC } from 'react';

import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface ActionIconButtonProps {
  Icon: LucideIcon;
  tooltip: string;
  onClick: () => void;
}

const ActionIconButton: FC<ActionIconButtonProps> = ({
  Icon,
  tooltip,
  onClick,
}) => {
  return (
    <TooltipProvider delayDuration={100}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline" size="icon" onClick={onClick}>
            <Icon size={20} />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{tooltip}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default ActionIconButton;
