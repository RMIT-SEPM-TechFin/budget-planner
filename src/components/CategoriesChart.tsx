'use client';

import {
  ComponentProps,
  FC,
  MouseEvent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { Cell, Legend, Pie, PieChart, Sector } from 'recharts';

import type { Item } from '@/types';

const renderActiveShape: ComponentProps<typeof Pie>['activeShape'] = (
  props: Record<string, any>,
) => {
  const RADIAN = Math.PI / 180;
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value,
  } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? 'start' : 'end';

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
        {payload.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill="none"
      />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        textAnchor={textAnchor}
        fill="#333"
      >{`PV ${value}`}</text>
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        dy={18}
        textAnchor={textAnchor}
        fill="#999"
      >
        {`(Rate ${(percent * 100).toFixed(2)}%)`}
      </text>
    </g>
  );
};

const CategoriesChart: FC<{ items: Item[] }> = ({ items: items_ }) => {
  const randomColor = require('randomcolor');

  const [colors, setColors] = useState<string[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

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


  const onPieEnter = useCallback(
    (_: MouseEvent, index: number) => {
      setActiveIndex(index);
    },
    [setActiveIndex],
  );

  useEffect(() => {
    setColors(
      randomColor({
        hue: '#e11d48',
        count: items.length,
      }),
    );
  }, [items.length, randomColor]);

  return (
    <PieChart width={900} height={500}>
      <Pie
        activeIndex={activeIndex}
        activeShape={renderActiveShape}
        data={categories}
        cx={350}
        cy={250}
        innerRadius={100}
        outerRadius={160}
        dataKey="totalValue"
        onMouseEnter={onPieEnter}
      >
        {items.map((items, index) => (
          <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
        ))}
      </Pie>
      <Legend
        layout="vertical"
        verticalAlign="middle"
        align="right"
        iconType="square"
        payload={categories.map((cate, index) => ({
          value: cate.category + ': ' + cate.totalValue + '$',
          type: 'square',
          color: colors[index % colors.length],
        }))}
        height={200}
      />
    </PieChart>
  );
};

export default CategoriesChart;
