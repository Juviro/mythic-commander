import React from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip } from 'recharts';

export const COLLECTION_VALUE = 'Collection value';

export default ({ formattedData }) => (
  <AreaChart width={700} height={250} data={formattedData} stackOffset="sign">
    <defs>
      <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
        <stop offset="5%" stopColor="#3182bd" stopOpacity={0.8} />
        <stop offset="95%" stopColor="#3182bd" stopOpacity={0.4} />
      </linearGradient>
    </defs>
    <XAxis
      dataKey="date"
      interval="preserveStartEnd"
      tickCount={10}
      allowDataOverflow
    />
    <YAxis yAxisId="value" unit=" $" />
    <Tooltip />
    <Area
      yAxisId="value"
      type="monotone"
      dataKey={COLLECTION_VALUE}
      unit="$"
      stroke="#3182bd"
      fill="url(#colorValue)"
    />
  </AreaChart>
);
