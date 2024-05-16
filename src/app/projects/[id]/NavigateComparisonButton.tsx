'use client';

import { Diff } from 'lucide-react';
import Link from 'next/link';
import { FC } from 'react';

import ActionIconButton from '@/components/ActionIconButton';

interface NavigateComparisonButtonProps {
  projectId: string;
}

const NavigateComparisonButton: FC<NavigateComparisonButtonProps> = ({
  projectId,
}) => {
  return (
    <Link href={`/projects/${projectId}/comparison`}>
      <ActionIconButton Icon={Diff} tooltip="Compare Plans" />
    </Link>
  );
};

export default NavigateComparisonButton;
