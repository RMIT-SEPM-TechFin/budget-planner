import { getCookie } from 'cookies-next';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { USER_EMAIL_COOKIE_NAME } from '@/constants';

import Chart from './Chart';

// Force dynamic to be able to use cookies
export const dynamic = 'force-dynamic';

// Ensure the page always dynamically rendered
// Source: https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config#revalidate
export const revalidate = 0;

// BUG: When users log out, then log in with a different account, the previous account's projects are still shown
export default async function CostBreakdown() {
  const userEmail = getCookie(USER_EMAIL_COOKIE_NAME, { cookies });

  if (!userEmail) redirect('/');

  return (
    <div className="space-y-6">
      <h1>All Projects</h1>
      <Chart />
    </div>
  );
}
