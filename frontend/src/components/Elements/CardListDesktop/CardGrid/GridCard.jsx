import React from 'react';
import { Row, Col } from 'antd';
import styled from 'styled-components';

import FlippableCard from '../../FlippableCard';
import { getPriceLabel } from '../../../../utils/cardStats';
import OwnedBadge from '../../OwnedBadge';

const StyledCardWrapper = styled.div`
  margin: 0px 8px 0;
  height: fit-content;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const StyledImageWrapper = styled.div`
  width: 210px;
  height: 292px;
  border-radius: 12px;

  ${({ isSelected }) =>
    isSelected ? 'box-shadow: 0px 0px 6px 6px #1890ff;' : ''}
`;

const StyledInfoWrapper = styled(Row)`
  width: 100%;
  padding: 0 12px;
  align-items: center;
  margin-top: 8px;
  font-weight: 500;
`;

const StyledCol = styled(Col)`
  display: flex;
`;
export default ({ card, index, selectedElementPosition, onClick }) => {
  const displayedAmount = card.amount || card.totalAmount;
  return (
    <StyledCardWrapper
      key={card.id}
      onClick={() => onClick(index)}
      isSelected={index + 1 === selectedElementPosition}
    >
      <StyledImageWrapper isSelected={index + 1 === selectedElementPosition}>
        <FlippableCard card={card} />
      </StyledImageWrapper>
      <StyledInfoWrapper>
        <StyledCol span={8} style={{ justifyContent: 'flex-start' }}>
          {displayedAmount && `${displayedAmount}x`}
        </StyledCol>
        <StyledCol span={8} style={{ justifyContent: 'center' }}>
          {getPriceLabel(card.minPrice)}
        </StyledCol>
        <StyledCol span={8} style={{ justifyContent: 'flex-end' }}>
          {card.owned && <OwnedBadge />}
        </StyledCol>
      </StyledInfoWrapper>
    </StyledCardWrapper>
  );
};
