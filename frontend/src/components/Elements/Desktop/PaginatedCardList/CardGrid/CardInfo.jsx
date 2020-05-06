import React from 'react';
import { Row, Col, Typography } from 'antd';
import styled from 'styled-components';

import { getPriceLabel } from '../../../../../utils/cardStats';
import OwnedBadge from '../../../Shared/OwnedBadge';
import Flex from '../../../Shared/Flex';
import { highlightText } from '../../../../../utils/highlightText';

const StyledInfoWrapper = styled(Row)`
  width: 100%;
  align-items: center;
  justify-content: space-between;
`;

const StyledCol = styled(Col)`
  display: flex;
`;

export default ({ card, width, textSize, loading, search }) => {
  if (loading) return null;

  const displayedPrice = card.price || card.minPrice;

  return (
    <Flex direction="column" justify="center" style={{ width, marginTop: 4 }}>
      <Typography.Text ellipsis style={{ fontSize: textSize }}>
        {highlightText(search, card.name)}
      </Typography.Text>
      <StyledInfoWrapper style={{ fontSize: textSize }}>
        <StyledCol span={8} style={{ justifyContent: 'flex-start' }}>
          {getPriceLabel(displayedPrice)}
        </StyledCol>
        <StyledCol span={8} style={{ justifyContent: 'flex-end' }}>
          {card.owned && <OwnedBadge style={{ fontSize: textSize }} />}
        </StyledCol>
      </StyledInfoWrapper>
    </Flex>
  );
};
