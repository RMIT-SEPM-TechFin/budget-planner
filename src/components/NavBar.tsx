'use client';

import React, { FC } from 'react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import useAuth from '@/hooks/useAuth';
import { cn } from '@/lib/utils';

import Logo from './ui/logo';

const NavBar: FC = () => {
  const { user, signIn, logOut, isLoading } = useAuth();

  return (
    <nav
      className={cn(
        'w-full min-h-[72px] px-10 py-4 border-b border-gray-300',
        'flex items-center justify-center',
      )}
    >
      <div className="flex-1 max-w-[1200px] flex items-center justify-between">
        {/* TODO: Add Logo */}
        <Logo />

        <div>
          {/* User hasn't signed in, show Sign In button */}
          {!isLoading && !user && <Button onClick={signIn}>Sign In</Button>}

          {/* User has signed in, show Avatar with Dropdown */}
          {!isLoading && user && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="border-2 border-black hover:opacity-80 cursor-pointer">
                  <AvatarImage
                    src={user.photoUrl ?? ''}
                    alt={user.name ?? ''}
                  />
                  <AvatarFallback>{user.name ?? ''}</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Button onClick={logOut} className="w-full">
                    Logout
                  </Button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
