import React from 'react';
import { useQuery } from 'react-apollo';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend } from 'recharts';

import { collectionDevelopment } from './queries';
import formatDate from '../../../utils/formatDate';

const COLLECTED_CARDS = 'Unique cards';
const UNIQUE_CARDS = 'Collected cards';
const COLLECTION_VALUE = 'Collection value';

export default () => {
  const { data } = useQuery(collectionDevelopment);
  console.log('data :', data);

  const formattedData =
    data &&
    data.collectionDevelopment.map(({ amount, amountUnique, value, date }) => ({
      date: formatDate(date, true),
      [COLLECTED_CARDS]: amount,
      [UNIQUE_CARDS]: amountUnique,
      [COLLECTION_VALUE]: value,
    }));

  return (
    <div style={{ width: 420 }}>
      <LineChart
        width={350}
        height={300}
        data={formattedData}
        stackOffset="sign"
        margin={{ top: 64 }}
      >
        <XAxis dataKey="date" />
        <YAxis yAxisId="amount" />
        <YAxis yAxisId="value" orientation="right" unit=" $" />
        <Tooltip />
        <Legend />
        <Line
          yAxisId="amount"
          type="monotone"
          dataKey={UNIQUE_CARDS}
          stroke="#8884d8"
        />
        <Line
          yAxisId="amount"
          type="monotone"
          dataKey={COLLECTED_CARDS}
          stroke="#82ca9d"
        />
        <Line
          yAxisId="value"
          type="monotone"
          dataKey={COLLECTION_VALUE}
          unit="$"
        />
      </LineChart>
    </div>
  );
};
