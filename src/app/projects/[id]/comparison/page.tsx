import { TooltipContent } from '@radix-ui/react-tooltip';
import { getCookie } from 'cookies-next';
import { cookies } from 'next/headers';
import Link from 'next/link';
import { redirect } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { Tooltip, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { USER_EMAIL_COOKIE_NAME } from '@/constants';

import BreadcrumbComparison from './BreadcumbsComparison';
import Comparison from './Comparison';

// Force dynamic to be able to use cookies
export const dynamic = 'force-dynamic';

export default async function Project({ params}: { params: { id: string } }) {
  const { id } = params;

  const userEmail = getCookie(USER_EMAIL_COOKIE_NAME, { cookies });
  if (!userEmail) redirect('/');

  return (
    <div className="relative">
      <div className="flex justify-between">
        <BreadcrumbComparison />
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Link href={`/projects/${id}`}>
                <Button
                  className="bg-white border-[1px] border-[#e4e4e7]"
                  variant="secondary"
                >
                  Back to Project Page
                </Button>
              </Link>
            </TooltipTrigger>
            <TooltipContent>Go back to the project page</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <Comparison params={{ id }} />
    </div>
  );
}
