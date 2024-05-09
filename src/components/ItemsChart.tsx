'use client';

import { FC, useMemo } from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Rectangle,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import type { Item } from '@/types';

const ItemsChart: FC<{ items: Item[] }> = ({ items: items_ }) => {
  const randomColor = require('randomcolor');

  // Preprocess the data to include the totalValue
  const items = useMemo(() => {
    return items_.map((item) => ({
      ...item,
      Total: item.price * item.quantity,
    }));
  }, [items_]);

  return (
    <BarChart
      width={900}
      height={500}
      data={items}
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
      <Bar
        barSize={90}
        dataKey="Total"
        // border-radius: calc(var(--radius) - 2px);
        fill="hsl(346.8 77.2% 49.8%)"
        opacity={1}
        activeBar={<Rectangle fill="hsla(346.8, 77.2%, 49.8%, 0.9)" />}
      />
    </BarChart>
  );
};

export default ItemsChart;
