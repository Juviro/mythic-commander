import React from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export const COLLECTION_VALUE = 'Collection value';

export default ({ formattedData, dataKey = COLLECTION_VALUE, unit = '$' }) => (
  <ResponsiveContainer width="100%" height={250}>
    <AreaChart data={formattedData} stackOffset="sign">
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
      <YAxis yAxisId="value" unit={` ${unit}`} />
      <Tooltip />
      <Area
        yAxisId="value"
        type="monotone"
        dataKey={dataKey}
        unit={unit}
        stroke="#3182bd"
        fill="url(#colorValue)"
      />
    </AreaChart>
  </ResponsiveContainer>
);
