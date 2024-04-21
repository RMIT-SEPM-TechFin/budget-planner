'use client';

import { Dialog, DialogTrigger } from '@radix-ui/react-dialog';
import { FC, useState } from 'react';
import * as XLSX from 'xlsx';

import { Button } from '@/components/ui/button';
import { Category } from '@/types';

const ExportData: FC<{
  className?: string;
  categories: Category[];
  data: any[];
}> = ({ className, categories, data }) => {
  const [open, setOpen] = useState(false);
  const handleExport = () => {
    const dataConvert = data.map((item) => {
      const { category, id, ...rest } = item;
      const cate = categories.find((cat) => cat.id === item.category);
      return {
        CategoryName: cate ? cate.name : 'Unknown',
        ...rest,
        Total: item.price * item.quantity,
      };
    });
    const ws = XLSX.utils.json_to_sheet(dataConvert);
    const csv = XLSX.utils.sheet_to_csv(ws); // Convert sheet to CSV
    ws['!cols'] = [{ wch: 50 }];

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });

    // Create a link and trigger download
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.href = url;
    link.download = 'data.csv';
    link.click();
  };
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
            width="36px"
            height="36px"
            viewBox="-2.4 -2.4 28.80 28.80"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            transform="matrix(1, 0, 0, 1, 0, 0)"
          >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
              stroke="#CCCCCC"
              strokeWidth="0.768"
            ></g>
            <g id="SVGRepo_iconCarrier">
              <path
                d="M3 15C3 17.8284 3 19.2426 3.87868 20.1213C4.75736 21 6.17157 21 9 21H15C17.8284 21 19.2426 21 20.1213 20.1213C21 19.2426 21 17.8284 21 15"
                stroke="#1C274C"
                strokeWidth="0.744"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
              <path
                d="M12 3V16M12 16L16 11.625M12 16L8 11.625"
                stroke="#1C274C"
                strokeWidth="0.744"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
            </g>
          </svg>
        </Button>
      </DialogTrigger>
    </Dialog>
  );
};

export default ExportData;
