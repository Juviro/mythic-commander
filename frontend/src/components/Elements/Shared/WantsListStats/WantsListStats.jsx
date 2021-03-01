import React from 'react';
import styled from 'styled-components';
import { Descriptions, Skeleton } from 'antd';

import { getListStats } from 'utils/getListStats';

const StyledDescription = styled(Descriptions)`
  margin-left: 8px;

  .ant-descriptions-view table {
    width: auto;
  }
`;

export default ({ wantsList }) => {
  if (!wantsList) return <Skeleton />;

  const { numberOfCards, numberOfUniqueCards, ownedValueLabel } = getListStats(wantsList);

  return (
    <StyledDescription column={1}>
      <Descriptions.Item label="Total Cards">{numberOfCards}</Descriptions.Item>
      <Descriptions.Item label="Unique Cards">{numberOfUniqueCards}</Descriptions.Item>
      <Descriptions.Item label="Total costs">{ownedValueLabel}</Descriptions.Item>
    </StyledDescription>
  );
};
