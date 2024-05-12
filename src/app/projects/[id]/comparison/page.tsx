import { getCookie } from 'cookies-next';
import { cookies } from 'next/headers';
import Link from 'next/link';
import { redirect } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { USER_EMAIL_COOKIE_NAME } from '@/constants';

import ProjectName from '../ProjectName';
import Comparison from './Comparison';

// Force dynamic to be able to use cookies
export const dynamic = 'force-dynamic';

export default async function Project({ params }: { params: { id: string } }) {
  const { id } = params;

  const userEmail = getCookie(USER_EMAIL_COOKIE_NAME, { cookies });
  if (!userEmail) redirect('/');

  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        <ProjectName />
        <Link href={`/projects/${id}`} passHref>
          <Button variant="outline">Back</Button>
        </Link>
      </div>
      <Comparison />
    </div>
  );
}
