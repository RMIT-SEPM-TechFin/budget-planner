import { ReactNode } from 'react';

export default async function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="space-y-4">
      <div className="relative">{children}</div>
    </div>
  );
}
