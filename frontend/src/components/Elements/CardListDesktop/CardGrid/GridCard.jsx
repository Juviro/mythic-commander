import React from 'react';
import { Row, Col } from 'antd';
import styled from 'styled-components';

import FlippableCard from '../../FlippableCard';
import { getPriceLabel } from '../../../../utils/cardStats';
import OwnedBadge from '../../OwnedBadge';

const StyledCardWrapper = styled.div`
  margin: 0 8px 8px;
  height: fit-content;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  position: relative;
  width: calc(${({ widthPercentage }) => widthPercentage}% - 16px);
`;

const StyledImageWrapper = styled.div`
  width: 210px;
  height: 292px;
  border-radius: 12px;

  ${({ isSelected }) =>
    isSelected ? 'box-shadow: 0px 0px 6px 6px #1890ff;' : ''}
`;

const StyledInfoWrapper = styled(Row)`
  padding: 0 12px;
  align-items: center;
  position: absolute;
  background-color: #ececec;
  opacity: 0.8;
  bottom: 0;
  width: 170px;
  align-self: flex-start;
  border-top-right-radius: 8px;
  border-bottom-left-radius: 8px;
`;

const StyledCol = styled(Col)`
  display: flex;
`;
const GridCard = ({ card, onClick, isSelected, widthPercentage }) => {
  const displayedAmount = card.amount || card.totalAmount;
  return (
    <StyledCardWrapper
      key={card.id}
      onClick={onClick}
      widthPercentage={widthPercentage}
    >
      <StyledImageWrapper isSelected={isSelected}>
        <FlippableCard card={card} />
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
      </StyledImageWrapper>
    </StyledCardWrapper>
  );
};

const areEqual = (prevProps, nextProps) => {
  if (prevProps.isSelected !== nextProps.isSelected) return false;
  if (prevProps.widthPercentage !== nextProps.widthPercentage) return false;

  return ['id', 'amount', 'totalAmount', 'sumPrice', 'minPrice'].every(
    propKey => {
      return prevProps.card[propKey] === nextProps.card[propKey];
    }
  );
};

export default React.memo(GridCard, areEqual);
