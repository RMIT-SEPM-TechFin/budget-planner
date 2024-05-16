'use client';

import Link from 'next/link';
import { FC } from 'react';

import { Button } from '@/components/ui/button';
import useAuth from '@/hooks/useAuth';

const HomePageActionButton: FC = () => {
  const { user, signIn } = useAuth();

  return user ? (
    <Button className="text-base font-semibold py-6 px-3">
      <Link href="/dashboard">Start Now</Link>
    </Button>
  ) : (
    <Button
      onClick={signIn}
      className="bg-black text-base font-semibold hover:bg-accent hover:text-accent-foreground py-6 px-3"
    >
      Sign In
    </Button>
  );
};

export default HomePageActionButton;
