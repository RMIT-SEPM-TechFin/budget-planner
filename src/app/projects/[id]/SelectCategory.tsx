import { MoreVertical, Plus } from 'lucide-react';
import React, { FC, ReactNode } from 'react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
} from '@/components/ui/select';

const SelectItemEdit: FC<{ value: string; children: ReactNode }> = ({
  value,
  children,
}) => {
  return (
    <div className="relative">
      <SelectItem className="relative z-0" value={value}>
        {children}
      </SelectItem>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="absolute h-8 w-8 right-0 top-0 z-100"
          >
            <span className="sr-only">Open menu</span>
            <MoreVertical className="h-4 w-4 absolute" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="center" side="right">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <Input placeholder="Rename" value={value} defaultValue={value} />
          <DropdownMenuSeparator />
          <DropdownMenuItem>Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

const CategoryLabelAdd: FC<{ className?: string; children: ReactNode }> = ({
  className,
  children,
}) => {
  return (
    <div className="relative">
      <SelectLabel className={className}>{children}</SelectLabel>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="absolute h-8 w-8 right-0 top-0 z-100"
          >
            <span className="sr-only">Open menu</span>
            <Plus className="h-4 w-4 absolute" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="center" side="right">
          <Input placeholder="New Category" />
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

const SelectCategory: FC<{ className?: string; name?: string }> = ({
  className,
  name,
}) => {
  const category: string[] = ['apple', 'banana', 'cherry'];
  return (
    <Select name={name}>
      <SelectTrigger className={className}>Select Category</SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <CategoryLabelAdd>Category</CategoryLabelAdd>
          {category.length == 0 ? (
            <SelectItem value=" " disabled>
              No category
            </SelectItem>
          ) : (
            category.map((item) => (
              <SelectItemEdit key={item} value={item}>
                {item}
              </SelectItemEdit>
            ))
          )}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default SelectCategory;
