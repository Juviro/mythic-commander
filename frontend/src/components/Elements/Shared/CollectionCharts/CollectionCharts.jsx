import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useLazyQuery } from '@apollo/client';
import { Typography, Divider, Space } from 'antd';
import { LineChartOutlined, LoadingOutlined } from '@ant-design/icons';

import { useToggle } from '../../../Hooks';
import { collectionSnapshots } from './queries';
import formatDate from '../../../../utils/formatDate';
import { primary } from '../../../../constants/colors';
import AmountChart, { COLLECTED_CARDS, UNIQUE_CARDS } from './AmountChart';
import ValueChart, { COLLECTION_VALUE } from './ValueChart';
import FocusedModal from '../FocusedModal';

const StyledWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  align-self: flex-start;
  margin-top: 8px;
`;

export default ({ currentSnapshot }) => {
  const [visible, toggleVisible] = useToggle();

  const [fetchData, { data, loading, called }] = useLazyQuery(collectionSnapshots, {
    fetchPolicy: 'cache-first',
  });

  useEffect(() => {
    if (!visible || called) return;
    fetchData();
  }, [visible]);

  const snapshots =
    data && [...data.collectionSnapshots, currentSnapshot].filter(Boolean);

  const formattedData =
    snapshots &&
    snapshots.map(({ amount, amountUnique, value, date, dateLabel }) => ({
      date: dateLabel || formatDate(date, true),
      [COLLECTED_CARDS]: amount,
      [UNIQUE_CARDS]: amountUnique,
      [COLLECTION_VALUE]: value,
    }));

  return (
    <StyledWrapper>
      <Typography.Text
        style={{ color: primary, cursor: 'pointer', marginTop: 8 }}
        onClick={toggleVisible}
      >
        <Space>
          <LineChartOutlined />
          Show Trend
        </Space>
      </Typography.Text>
      <FocusedModal
        destroyOnClose
        visible={visible}
        onCancel={toggleVisible}
        style={{ height: 500, top: 20 }}
        styles={{
          body: {
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
            justifyContent: 'center',
            minHeight: 500,
          },
        }}
        width={800}
        footer={null}
        title="Collection Trend"
        focusId="modal.collectionCharts"
      >
        {loading ? (
          <LoadingOutlined style={{ fontSize: 48 }} />
        ) : (
          <>
            <Divider>Collected Cards</Divider>
            <AmountChart formattedData={formattedData} />
            <Divider>Collection Value</Divider>
            <ValueChart formattedData={formattedData} />
          </>
        )}
      </FocusedModal>
    </StyledWrapper>
  );
};
