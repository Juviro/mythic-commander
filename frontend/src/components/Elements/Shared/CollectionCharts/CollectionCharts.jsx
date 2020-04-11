import React from 'react';
import styled from 'styled-components';
import { useQuery } from 'react-apollo';
import { Modal, Typography, Divider } from 'antd';
import { AreaChart, Area, XAxis, YAxis, Tooltip } from 'recharts';

import { useToggle } from '../../../Hooks';
import { collectionSnapshots } from './queries';
import formatDate from '../../../../utils/formatDate';
import { primary } from '../../../../constants/colors';

const COLLECTED_CARDS = 'Collected cards';
const UNIQUE_CARDS = 'Unique cards';
const COLLECTION_VALUE = 'Collection value';

const StyledWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default () => {
  const [isVisible, toggleIsVisible] = useToggle();
  const { data } = useQuery(collectionSnapshots);

  const formattedData =
    data &&
    data.collectionSnapshots.map(({ amount, amountUnique, value, date }) => ({
      date: formatDate(date, true),
      [COLLECTED_CARDS]: amount,
      [UNIQUE_CARDS]: amountUnique,
      [COLLECTION_VALUE]: value,
    }));

  return (
    <StyledWrapper>
      <Typography.Text
        style={{ color: primary, cursor: 'pointer' }}
        onClick={toggleIsVisible}
      >
        show trend
      </Typography.Text>
      <Modal
        destroyOnClose
        visible={isVisible}
        onCancel={toggleIsVisible}
        style={{ height: 500 }}
        width={800}
        footer={null}
        title="Collection Trend"
      >
        <Divider>Collected Cards</Divider>
        <AreaChart
          width={700}
          height={250}
          data={formattedData}
          stackOffset="sign"
        >
          <defs>
            <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="date" interval={3} allowDataOverflow />
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
        <Divider>Collection Value</Divider>
        <AreaChart
          width={700}
          height={250}
          data={formattedData}
          stackOffset="sign"
        >
          <defs>
            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3182bd" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#3182bd" stopOpacity={0.4} />
            </linearGradient>
          </defs>
          <XAxis dataKey="date" interval={3} allowDataOverflow />
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
      </Modal>
    </StyledWrapper>
  );
};
