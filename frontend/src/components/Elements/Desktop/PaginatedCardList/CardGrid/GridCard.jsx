import React, { useRef, useEffect } from 'react';
import { Row, Col } from 'antd';
import styled from 'styled-components';

import FlippableCard from '../../../Shared/FlippableCard';
import { getPriceLabel } from '../../../../../utils/cardStats';
import OwnedBadge from '../../../Shared/OwnedBadge';
import { primary } from '../../../../../constants/colors';
import scrollIntoView from '../../../../../utils/scrollIntoView';

const StyledCardWrapper = styled.div`
  padding: 8px;
  height: fit-content;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  position: relative;
  width: ${({ widthPercentage }) => widthPercentage}%;
`;

const StyledImageWrapper = styled.div`
  position: relative;
  border-radius: 12px;

  ${({ isSelected }) =>
    isSelected ? `box-shadow: 0px 0px 6px 6px ${primary};` : ''}
`;

const StyledInfoWrapper = styled(Row)`
  padding: 0 12px;
  align-items: center;
  position: absolute;
  background-color: #ececec;
  opacity: 0.8;
  bottom: 0;
  width: 80%;
  align-self: flex-start;
  border-top-right-radius: 8px;
  border-bottom-left-radius: 8px;
`;

const StyledCol = styled(Col)`
  display: flex;
`;
const GridCard = ({
  card,
  onClick,
  isSelected,
  widthPercentage,
  width,
  loading,
}) => {
  const displayedAmount = card.amount || card.totalAmount;
  const ref = useRef(null);

  useEffect(() => {
    if (!isSelected || !ref) return;
    scrollIntoView(ref.current);
  }, [isSelected]);

  const cardSize = { width, height: width * 1.39 };

  return (
    <StyledCardWrapper
      key={card.id}
      widthPercentage={widthPercentage}
      ref={ref}
    >
      <StyledImageWrapper
        isSelected={isSelected}
        onClick={onClick}
        style={cardSize}
      >
        <FlippableCard card={card} loading={loading} />
        {!loading && (
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
        )}
      </StyledImageWrapper>
    </StyledCardWrapper>
  );
};

const areEqual = (prevProps, nextProps) => {
  if (prevProps.isSelected !== nextProps.isSelected) return false;
  if (prevProps.widthPercentage !== nextProps.widthPercentage) return false;
  if (prevProps.width !== nextProps.width) return false;
  if (prevProps.loading !== nextProps.loading) return false;

  return ['id', 'amount', 'owned', 'totalAmount', 'sumPrice', 'minPrice'].every(
    propKey => {
      return prevProps.card[propKey] === nextProps.card[propKey];
    }
  );
};

export default React.memo(GridCard, areEqual);
