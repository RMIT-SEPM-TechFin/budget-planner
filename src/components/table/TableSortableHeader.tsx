import { HeaderContext } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';

interface TableSortableHeaderProps<TData, TValue> {
  title: string;
  props: HeaderContext<TData, TValue>;
}

function TableSortableHeader<TData, TValue>({
  title,
  props,
}: TableSortableHeaderProps<TData, TValue>) {
  return (
    <div
      onClick={() =>
        props.column.toggleSorting(props.column.getIsSorted() === 'asc')
      }
      className="cursor-pointer select-none flex items-center gap-1"
    >
      {title}
      <ArrowUpDown className="h-4 w-4" />
    </div>
  );
}

export default TableSortableHeader;
