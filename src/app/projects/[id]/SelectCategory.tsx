import { MoreVertical, Plus } from 'lucide-react';
import { FC, ReactNode, useCallback, useState, useTransition } from 'react';

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
  SelectValue,
} from '@/components/ui/select';
import useNotification from '@/hooks/useNotification';
import useProject from '@/hooks/useProject';
import { Category } from '@/types';

import { addCategory, deleteCategory, editCategory } from './actions';

const SelectItemEdit: FC<{
  value: string;
  children: ReactNode;
  name: string;
}> = ({ value, children, name }) => {
  const { projectId } = useProject();
  const { showNotification } = useNotification();
  const [_, startTransition] = useTransition();
  const [newName, setNewName] = useState(value);
  const [open, setOpen] = useState(false);

  const handleDelete = useCallback(() => {
    startTransition(() => {
      try {
        deleteCategory(projectId, value);
        showNotification({
          title: 'Category Deleted',
          variant: 'success',
        });
      } catch {
        showNotification({
          title: 'Failed to delete Category',
          variant: 'failure',
        });
      }
    });
  }, [projectId, value, showNotification, startTransition]);

  const handleEdit = useCallback(() => {
    startTransition(() => {
      try {
        console.log(newName);
        editCategory(projectId, value, newName);
        setOpen(false);
        showNotification({
          title: 'Edit Category Successfully',
          variant: 'success',
        });
      } catch {
        showNotification({
          title: 'Failed to edit Category',
          variant: 'failure',
        });
      }
    });
  }, [projectId, value, newName, showNotification, startTransition]);

  return (
    <div className="relative">
      <SelectItem className="relative z-0" value={value}>
        {children}
      </SelectItem>
      <DropdownMenu open={open} onOpenChange={setOpen}>
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
          <div className="flex gap-2">
            <Input
              placeholder="Rename"
              defaultValue={name}
              onChange={(e) => setNewName(e.target.value)}
            />
            <Button
              onClick={handleEdit}
              disabled={!newName || newName == value}
            >
              Edit
            </Button>
          </div>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleDelete}>Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

const CategoryLabelAdd: FC<{ className?: string; children: ReactNode }> = ({
  className,
  children,
}) => {
  const { showNotification } = useNotification();
  const { projectId } = useProject();
  const [_, startTransition] = useTransition();
  const [category, setCategory] = useState('');
  const [open, setOpen] = useState(false);

  const setInitialState = () => {
    setCategory('');
    setOpen(false);
  };

  const handleAddCategory = useCallback(() => {
    startTransition(() => {
      try {
        addCategory(projectId, category);
        setInitialState();
        showNotification({
          title: 'New Category Created',
          variant: 'success',
        });
      } catch {
        showNotification({
          title: 'Failed to create new Category',
          variant: 'failure',
        });
      }
    });
  }, [projectId, category, showNotification, startTransition]);

  return (
    <div className="relative">
      <SelectLabel className={className}>{children}</SelectLabel>
      <DropdownMenu open={open} onOpenChange={setOpen}>
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
          <div className="flex gap-2">
            <Input
              placeholder="New Category"
              onChange={(e) => {
                setCategory(e.target.value);
              }}
            />
            <Button
              type="submit"
              onClick={handleAddCategory}
              disabled={!category}
            >
              Add
            </Button>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

const SelectCategory: FC<{
  className?: string;
  categories: Category[];
  fieldOnChange: (value: string) => void;
  defaultValue?: string;
}> = ({ className, categories, fieldOnChange, defaultValue }) => {
  return (
    <Select
      onValueChange={fieldOnChange}
      defaultValue={defaultValue && defaultValue}
    >
      <SelectTrigger className={className}>
        <SelectValue placeholder="Select Category" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <CategoryLabelAdd>Category</CategoryLabelAdd>
          {categories.length == 0 ? (
            <SelectItem value="" disabled>
              No category
            </SelectItem>
          ) : (
            categories.map((item) => (
              <SelectItemEdit key={item.id} value={item.id} name={item.name}>
                {item.name}
              </SelectItemEdit>
            ))
          )}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default SelectCategory;
