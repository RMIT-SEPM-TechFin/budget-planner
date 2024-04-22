'use client';

import { Dialog, DialogTrigger } from '@radix-ui/react-dialog';
import { FC, useCallback, useState } from 'react';
import * as XLSX from 'xlsx';

import { Button } from '@/components/ui/button';
import { Category } from '@/types';

const ExportData: FC<{
  className?: string;
  categories: Category[];
  data: any[];
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
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant={'ghost'}
          className={className}
          onClick={() => {
            setOpen(true);
            handleExport();
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.25"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-download"
          >
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" x2="12" y1="15" y2="3" />
          </svg>
        </Button>
      </DialogTrigger>
    </Dialog>
  );
};

export default ExportData;
