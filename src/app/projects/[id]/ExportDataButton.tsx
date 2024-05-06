'use client';

import { ArrowDownToLine } from 'lucide-react';
import { FC, useCallback } from 'react';
import * as XLSX from 'xlsx';

import ActionIconButton from '@/components/ActionIconButton';

import { useProject } from './context';

const ExportDataButton: FC<{}> = () => {
  const {categories, items, plans} = useProject();
  const handleExport = useCallback(() => {
    // handle all items
    const workbook = XLSX.utils.book_new();
    const allItemData = items.map((item) => {
      const { category, id, ...rest } = item;
      const cate = categories.find((cat) => cat.id === item.category);
      return {
        CategoryName: cate ? cate.name : 'Unknown',
        ...rest,
        Total: item.price * item.quantity,
      };
    });
    const worksheet = XLSX.utils.json_to_sheet(allItemData);
    XLSX.utils.book_append_sheet(workbook, worksheet, 'All Item');
    // handle each of items in plans
    plans.forEach((plan) => {
      const planItems = items.filter((item) => plan.items.includes(item.id));
      const planData = planItems.map((item) => {
        const { category, id, ...rest } = item;
        const cate = categories.find((cat) => cat.id === item.category);
        return {
          CategoryName: cate ? cate.name : 'Unknown',
          ...rest,
          Total: item.price * item.quantity,
        };
      });

      const worksheet = XLSX.utils.json_to_sheet(planData);
      XLSX.utils.book_append_sheet(workbook, worksheet, plan.name);

      const max_width = planData.reduce(
        (w, r) => Math.max(w, r.name.length),
        10,
      );

      worksheet['!cols'] = [{ wch: max_width }];
    });
    XLSX.writeFile(workbook, 'all_plans_data.xlsx', { compression: true });
  }, [items, categories, plans]);

  return (
    <ActionIconButton
      Icon={ArrowDownToLine}
      onClick={() => handleExport()}
      tooltip="Export Data"
    />
  );
};

export default ExportDataButton;
