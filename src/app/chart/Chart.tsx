'use client';

import { List } from "postcss/lib/list";
import React, { useCallback, useState } from "react";
import { Cell, Legend, Pie, PieChart, Sector } from "recharts";

const data = [
  { name: "Group A", value: 400 },
  { name: "Group B", value: 300 },
  { name: "Group C", value: 300 },
  { name: "Group D", value: 200 },
  { name: "Group E", value: 278 },
  { name: "Group F", value: 189 }
];


const generateRandomColor = () => {
  const minLuminance = 0.6; // Minimum luminance for contrast
  const maxLuminance = 0.7; // Maximum luminance for contrast
  const minSaturation = 0.1; // Minimum saturation for color richness
  const maxSaturation = 0.5; // Maximum saturation for color richness

  const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;
  const randomHue = () => randomInRange(0, 360);

  let h, s, l, color;
  do {
    h = randomHue();
    s = randomInRange(minSaturation, maxSaturation);
    l = randomInRange(minLuminance, maxLuminance);
    color = `hsl(${h},${s * 100}%,${l * 100}%)`;
  } while (luminance(h, s, l) > maxLuminance || luminance(h, s, l) < minLuminance);

  return color;
};

const luminance = (h: number, s: number, l: number) => {
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return color;
  };
  return f(0.3) * 0.2126 + f(1) * 0.7152 + f(2) * 0.0722; // Calculate luminance using HSL color model
};

const generateColorArray = (numberOfColors: number) => {
  const colors = [];
  for (let i = 0; i < numberOfColors; i++) {
    colors.push(generateRandomColor());
  }
  return colors;
};

const COLORS = generateColorArray(data.length);

const renderActiveShape = (props: any) => {
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
    value
  } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? "start" : "end";

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

const Chart = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const onPieEnter = useCallback(
    (_: React.MouseEvent, index: number) => {
      setActiveIndex(index);
    },
    [setActiveIndex]
  );

  return (
    <PieChart width={900} height={500}>
      <Pie
        activeIndex={activeIndex}
        activeShape={renderActiveShape}
        data={data}
        cx={350}
        cy={250}
        innerRadius={100}
        outerRadius={160}
        dataKey="value"
        onMouseEnter={onPieEnter}
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Legend 
        layout="vertical" 
        verticalAlign="middle" 
        align="right" 
        iconType="square"
        payload= {data.map((entry, index) => ({
          value: entry.name + ": "+ entry.value,
          type: "square",
          color: COLORS[index % COLORS.length]
        }))}
        height={50} 
      />
    </PieChart>
  );
}

export { data, Chart as default };
