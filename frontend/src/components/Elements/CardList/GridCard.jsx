import React from 'react';
import { Typography } from 'antd';
import styled from 'styled-components';

import { getImageUrl } from '../../../utils/cardImage';
import { getPriceLabel } from '../../../utils/cardStats';
import EnlargeImage from './EnlargeImage';
import FlippableCard from '../FlippableCard';
import OwnedBadge from '../OwnedBadge';

const StyledWrapper = styled.div`
  width: 100%;
  padding: 4px;
  display: flex;
  position: relative;
  align-items: center;
  flex-direction: column;
  justify-content: center;
`;

const StyledFirstRow = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: ${({ justify }) => justify};
  padding: 0 8px;
`;

const StyledCardWrapper = styled.div`
  width: ${({ isLarge }) => (isLarge ? '90vw' : '43vw')};
  height: ${({ isLarge }) => (isLarge ? '125vw' : '60vw')};
  border-radius: 3%;
`;

const GridCard = ({ isLarge, card, onClick }) => {
  const imgSrc = getImageUrl(card.id, card.imgKey, 'normal');

  const style = isLarge
    ? { fontSize: 16, marginBottom: 8, padding: 20 }
    : { maxWidth: '50%' };

  const { minPrice, name, sumPrice, totalAmount, amount } = card;
  const displayedAmount = amount || totalAmount;
  const shouldDisplayTotal =
    (sumPrice && minPrice !== sumPrice) || displayedAmount > 1;
  const total = shouldDisplayTotal
    ? ` (${displayedAmount}x${
        card.sumPrice ? ` | ${getPriceLabel(card.sumPrice)}` : ''
      })`
    : '';

  return (
    <StyledWrapper style={style} onClick={onClick}>
      <StyledCardWrapper isLarge={isLarge}>
        <FlippableCard card={card} />
      </StyledCardWrapper>
      {!isLarge && <EnlargeImage src={imgSrc} card={card} />}
      <StyledFirstRow justify={card.owned ? 'space-between' : 'center'}>
        {card.owned && <OwnedBadge marginLeft={0} />}
        <Typography.Text>{getPriceLabel(minPrice) + total}</Typography.Text>
      </StyledFirstRow>
      <Typography.Text ellipsis style={{ maxWidth: 'calc(100% - 8px)' }}>
        {name}
      </Typography.Text>
    </StyledWrapper>
  );
};

const areEqual = (prevProps, nextProps) => {
  if (prevProps.isLarge !== nextProps.isLarge) return false;
  if (prevProps.loading !== nextProps.loading) return false;
  return ['id', 'amount', 'totalAmount', 'sumPrice'].every(propKey => {
    return prevProps.card[propKey] === nextProps.card[propKey];
  });
};

export default React.memo(GridCard, areEqual);
