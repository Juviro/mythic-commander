import React from 'react';
import styled from 'styled-components';
import { Descriptions, Skeleton } from 'antd';

import { getListStats } from 'utils/getListStats';
import { UnifiedList } from 'types/unifiedTypes';
import ValueLabel from '../ValueLabel';

const StyledDescription = styled(Descriptions)`
  .ant-descriptions-view table {
    width: auto;
  }
`;

interface Props {
  list: UnifiedList;
  hideUnique?: boolean;
  style?: React.CSSProperties;
}

export default ({ list, hideUnique, style }: Props) => {
  if (!list) return <Skeleton />;

  const { numberOfCards, numberOfUniqueCards } = getListStats(list);

  return (
    <StyledDescription column={1} style={style}>
      <Descriptions.Item label="Total Cards">{numberOfCards}</Descriptions.Item>
      {!hideUnique && (
        <Descriptions.Item label="Unique Cards">{numberOfUniqueCards}</Descriptions.Item>
      )}
      <Descriptions.Item label="Estimated value" style={{ whiteSpace: 'nowrap' }}>
        <ValueLabel list={list} />
      </Descriptions.Item>
    </StyledDescription>
  );
};
