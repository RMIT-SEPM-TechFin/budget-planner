import React, { FC, PureComponent, useMemo } from 'react';
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import { Item } from '@/types';

const CategoriesLineChart: FC<{ items: Item[] }> = ({ items: items_ }) => {
  // Preprocess the data to include the totalValue
  const items = useMemo(() => {
    return items_.map((item) => ({
      ...item,
      totalValue: item.price * item.quantity,
    }));
  }, [items_]);

  const categories = useMemo(() => {
    const totals: { [category: string]: number } = {};

    items.forEach((item) => {
      if (totals[item.category]) {
        totals[item.category] += item.totalValue;
      } else {
        totals[item.category] = item.totalValue;
      }
    });

    // Transform the totals object into an array of objects with category name and total value
    return Object.keys(totals).map((category) => ({
      category,
      totalValue: totals[category],
    }));
  }, [items]);

  return (
    <LineChart
      width={900}
      height={500}
      data={categories}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line
        type="monotone"
        dataKey="totalValue"
        stroke="hsl(346.8 77.2% 49.8%)"
        opacity={1}
      />
    </LineChart>
  );
};

export default CategoriesLineChart;
