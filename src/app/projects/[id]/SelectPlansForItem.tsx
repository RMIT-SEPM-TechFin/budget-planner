'use client';

import { Command as CommandPrimitive } from 'cmdk';
import { X } from 'lucide-react';
import {
  Dispatch,
  FC,
  SetStateAction, useCallback,
  useMemo,
  useRef,
  useState
} from 'react';

import { Badge } from '@/components/ui/badge';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { cn } from '@/lib/utils';
import type { Plan } from '@/types';

interface SelectPlansForItemProps {
  allPlans: Plan[];
  selectedPlans: Plan[];
  setSelectedPlans: Dispatch<SetStateAction<Plan[]>>;
  className?: string;
}

// Utilize from https://github.com/mxkaske/mxkaske.dev/blob/main/components/craft/fancy-multi-select.tsx
const SelectPlansForItem: FC<SelectPlansForItemProps> = ({
  allPlans,
  selectedPlans,
  setSelectedPlans,
  className,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const handleUnselect = useCallback(
    (plan: Plan) => {
      setSelectedPlans((prev) => prev.filter((s) => s.id !== plan.id));
    },
    [setSelectedPlans],
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      const input = inputRef.current;
      if (input) {
        if (e.key === 'Delete' || e.key === 'Backspace') {
          if (input.value === '') {
            setSelectedPlans((prev) => {
              const newSelected = [...prev];
              newSelected.pop();
              return newSelected;
            });
          }
        }
        // This is not a default behavior of the <input /> field
        if (e.key === 'Escape') {
          input.blur();
        }
      }
    },
    [setSelectedPlans],
  );

  const selectables = useMemo(
    () =>
      allPlans.filter((plan) => {
        const selectedPlanIds = selectedPlans.map((p) => p.id);
        return !selectedPlanIds.includes(plan.id);
      }),
    [allPlans, selectedPlans],
  );

  const isEmpty = useMemo(() => allPlans.length === 0, [allPlans]);

  return (
    <Command
      onKeyDown={handleKeyDown}
      className={cn('overflow-visible bg-transparent', className)}
    >
      <div className="group border border-input px-3 py-2 text-sm ring-offset-background rounded-md focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
        <div className="flex gap-1 flex-wrap">
          {selectedPlans.map((plan) => {
            return (
              <Badge key={plan.id} variant="secondary">
                {plan.name}
                <button
                  className="ml-1 ring-offset-background rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleUnselect(plan);
                    }
                  }}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                  onClick={() => handleUnselect(plan)}
                >
                  <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                </button>
              </Badge>
            );
          })}
          {/* Avoid having the "Search" Icon */}
          <CommandPrimitive.Input
            ref={inputRef}
            value={inputValue}
            onValueChange={setInputValue}
            onBlur={() => setOpen(false)}
            onFocus={() => setOpen(true)}
            placeholder={isEmpty ? 'No plans available' : 'Select plans'}
            className={cn(
              'bg-transparent outline-none placeholder:text-muted-foreground flex-1',
              isEmpty ? 'cursor-not-allowed' : '',
            )}
            disabled={isEmpty}
          />
        </div>
      </div>
      <div className="relative mt-2">
        {open && selectables.length > 0 ? (
          <div className="absolute w-full z-10 top-0 rounded-md border bg-popover text-popover-foreground shadow-md outline-none animate-in">
            <CommandList>
              <CommandEmpty>No plans found</CommandEmpty>
              <CommandGroup className="h-full overflow-auto">
                {selectables.map((plan) => {
                  return (
                    <CommandItem
                      key={plan.id}
                      onMouseDown={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                      }}
                      onSelect={(_) => {
                        setInputValue('');
                        setSelectedPlans((prev) => [...prev, plan]);
                      }}
                      className={'cursor-pointer'}
                    >
                      {plan.name}
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            </CommandList>
          </div>
        ) : null}
      </div>
    </Command>
  );
};

export default SelectPlansForItem;
