import React from 'react';
import styled from 'styled-components';
import { useQuery } from 'react-apollo';
import { Modal, Typography, Divider } from 'antd';

import { useToggle } from '../../../Hooks';
import { collectionSnapshots } from './queries';
import formatDate from '../../../../utils/formatDate';
import { primary } from '../../../../constants/colors';
import AmountChart, { COLLECTED_CARDS, UNIQUE_CARDS } from './AmountChart';
import ValueChart, { COLLECTION_VALUE } from './ValueChart';

const StyledWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default ({ currentSnapshot }) => {
  const [isVisible, toggleIsVisible] = useToggle();
  const { data } = useQuery(collectionSnapshots);

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
        <AmountChart formattedData={formattedData} />
        <Divider>Collection Value</Divider>
        <ValueChart formattedData={formattedData} />
      </Modal>
    </StyledWrapper>
  );
};
