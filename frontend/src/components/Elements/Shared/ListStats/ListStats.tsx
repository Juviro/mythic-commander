import React from 'react';
import styled from 'styled-components';
import { Descriptions, Skeleton } from 'antd';

import { getListStats } from 'utils/getListStats';
import PurchaseIcon from 'components/Elements/Shared/PurchaseIcon';
import Flex from 'components/Elements/Shared/Flex';
import { UnifiedList } from 'types/unifiedTypes';

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

  const {
    numberOfCards,
    numberOfUniqueCards,
    ownedValueLabelUsd,
    ownedValueLabelEur,
  } = getListStats(list);

  return (
    <StyledDescription column={1} style={style}>
      <Descriptions.Item label="Total Cards">{numberOfCards}</Descriptions.Item>
      {!hideUnique && (
        <Descriptions.Item label="Unique Cards">{numberOfUniqueCards}</Descriptions.Item>
      )}
      <Descriptions.Item label="Estimated value" style={{ whiteSpace: 'nowrap' }}>
        <Flex wrap="wrap">
          <PurchaseIcon
            asLink={false}
            serviceName="tcgplayer"
            label={ownedValueLabelUsd}
            style={{ marginRight: 16 }}
          />
          <PurchaseIcon
            asLink={false}
            serviceName="cardmarket"
            label={ownedValueLabelEur}
          />
        </Flex>
      </Descriptions.Item>
    </StyledDescription>
  );
};
