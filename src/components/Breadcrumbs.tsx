'use client';

import assert from 'assert';
import { Slash } from 'lucide-react';
import { FC } from 'react';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

interface BreadcrumbsProps {
  items: {
    label: string;
    href?: string;
  }[];
}

const Breadcrumbs: FC<BreadcrumbsProps> = ({ items }) => {
  assert(items.length > 0, 'Breadcrumbs must have at least one item');

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {items.slice(0, items.length - 1).map((item) => (
          <>
            <BreadcrumbItem>
              <BreadcrumbLink href={item.href}>{item.label}</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              <Slash />
            </BreadcrumbSeparator>
          </>
        ))}
        <BreadcrumbItem>
          <BreadcrumbPage>{items[items.length - 1].label}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default Breadcrumbs;
