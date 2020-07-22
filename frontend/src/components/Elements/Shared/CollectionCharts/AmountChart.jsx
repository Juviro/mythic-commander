import React from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip } from 'recharts';

export const COLLECTED_CARDS = 'Collected cards';
export const UNIQUE_CARDS = 'Unique cards';

export default ({ formattedData }) => (
  <AreaChart width={700} height={250} data={formattedData} stackOffset="sign">
    <defs>
      <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
        <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
        <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
      </linearGradient>
    </defs>
    <XAxis dataKey="date" tickCount={10} interval="preserveStartEnd" allowDataOverflow />
    <YAxis yAxisId="amount" />
    <Tooltip />
    <Area
      yAxisId="amount"
      type="monotone"
      dataKey={COLLECTED_CARDS}
      stroke="#82ca9d"
      fill="url(#colorTotal)"
    />
    <Area
      yAxisId="amount"
      type="monotone"
      stroke="#8884d8"
      dataKey={UNIQUE_CARDS}
      fill="#8884d8"
    />
  </AreaChart>
);
