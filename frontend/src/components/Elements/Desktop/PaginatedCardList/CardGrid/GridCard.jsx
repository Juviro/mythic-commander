import React, { useRef, useEffect } from 'react';
import { Row, Col, Typography } from 'antd';
import styled from 'styled-components';

import FlippableCard from '../../../Shared/FlippableCard';
import { getPriceLabel } from '../../../../../utils/cardStats';
import OwnedBadge from '../../../Shared/OwnedBadge';
import Flex from '../../../Shared/Flex';
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
  border-radius: 4%;

  ${({ isSelected }) =>
    isSelected ? `box-shadow: 0px 0px 6px 6px ${primary};` : ''}
`;

const StyledAmountWrapper = styled.div`
  padding: 1% 12px;
  position: absolute;
  background-color: #aebde6;
  opacity: 0.8;
  bottom: 0;
  align-self: flex-start;
  border-top-right-radius: 8px;
  border-bottom-left-radius: 8px;
`;

const StyledInfoWrapper = styled(Row)`
  width: 100%;
  align-items: center;
  justify-content: space-between;
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
  zoom,
}) => {
  const displayedAmount = card.amount || card.totalAmount;
  const ref = useRef(null);

  useEffect(() => {
    if (!isSelected || !ref) return;
    scrollIntoView(ref.current);
  }, [isSelected]);

  const cardSize = { width, height: width * 1.39 };
  const textSize = Math.max(10 + 4 * (zoom / 100));
  const displayedPrice = card.price || card.minPrice;

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
        {displayedAmount > 1 && (
          <StyledAmountWrapper
            style={{ fontSize: textSize }}
          >{`${displayedAmount}x`}</StyledAmountWrapper>
        )}
      </StyledImageWrapper>
      {!loading && (
        <Flex
          direction="column"
          justify="center"
          style={{ width, marginTop: 4 }}
        >
          <Typography.Text ellipsis style={{ fontSize: textSize }}>
            {card.name}
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
      )}
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
