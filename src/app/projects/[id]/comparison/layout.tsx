import { ReactNode } from 'react';

export default async function Layout({
  params,
  children,
}: {
  params: { id: string };
  children: ReactNode;
}) {
  const { id } = params;

  return (
      <div className="space-y-4">
        <div className="relative">{children}</div>
      </div>
  );
}
