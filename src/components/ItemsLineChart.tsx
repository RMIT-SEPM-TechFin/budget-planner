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

import type { Item } from '@/types';

const ItemsLineChart: FC<{ items: Item[] }> = ({ items: items_ }) => {
  const randomColor = require('randomcolor');

  // Preprocess the data to include the totalValue
  const items = useMemo(() => {
    return items_.map((item) => ({
      ...item,
      Total: item.price * item.quantity,
    }));
  }, [items_]);

  return (
    <LineChart
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
      <Line
        type="monotone"
        stroke="hsl(346.8 77.2% 49.8%)"
        dataKey="Total"
        opacity={1}
      />
    </LineChart>
  );
};

export default ItemsLineChart;
