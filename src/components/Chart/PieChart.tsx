'use client';

import { List } from "postcss/lib/list";
import React, { FC, useCallback, useEffect,useState } from "react";
import { Cell, Legend, Pie, PieChart, Sector } from "recharts";

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

const Chart: FC<{ className?: string, data: any }> = ({ className, data}) => {

  var randomColor = require('randomcolor');
  var color = randomColor();

  // Preprocess the data to include the totalValue
  const modifiedData = data.map((entry: any) => ({
    ...entry,
    totalValue: entry.price * entry.quantity
  }));
  
  const [COLORS, setCOLORS] = useState<string[]>([]);
  
  useEffect(() => {
    setCOLORS(randomColor({luminosity: 'dark', count: modifiedData.length}));
  }, [modifiedData.length, randomColor]);

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
        data={modifiedData}
        cx={350}
        cy={250}
        innerRadius={100}
        outerRadius={160}
        dataKey="totalValue"
        onMouseEnter={onPieEnter}
      >
        {modifiedData.map((entry: any, index: any) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Legend 
        layout="vertical" 
        verticalAlign="middle" 
        align="right" 
        iconType="square"
        payload= {modifiedData.map((entry: any, index: any) => ({
          value: entry.name + ": "+ entry.totalValue + "$",
          type: "square",
          color: COLORS[index % COLORS.length]
        }))}
        height={50} 
      />
    </PieChart>
  );
}

export default Chart;
