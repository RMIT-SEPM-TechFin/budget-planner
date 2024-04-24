'use client';

import { Dialog, DialogTrigger } from '@radix-ui/react-dialog';
import { ArrowDownToLine } from 'lucide-react';
import { FC, useCallback, useState } from 'react';
import * as XLSX from 'xlsx';

import { Button } from '@/components/ui/button';
import { Category, Item } from '@/types';

const ExportData: FC<{
  className?: string;
  categories: Category[];
  data: Item[];
}> = ({ className, categories, data }) => {
  const [open, setOpen] = useState(false);

  const handleExport = useCallback(() => {
    const dataConvert = data.map((item) => {
      const { category, id, ...rest } = item;
      const cate = categories.find((cat) => cat.id === item.category);
      return {
        CategoryName: cate ? cate.name : 'Unknown',
        ...rest,
        Total: item.price * item.quantity,
      };
    });
    const worksheet = XLSX.utils.json_to_sheet(dataConvert);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'data');

    const max_width = dataConvert.reduce(
      (w, r) => Math.max(w, r.name.length),
      10,
    );
    worksheet['!cols'] = [{ wch: max_width }];
    XLSX.writeFile(workbook, 'data.xlsx', { compression: true });
  }, [data, categories]);
  return (
    <Button
      variant={'ghost'}
      className={className}
      onClick={() => {
        setOpen(true);
        handleExport();
      }}
    >
      <ArrowDownToLine />
    </Button>
  );
};

export default ExportData;
