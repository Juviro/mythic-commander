import React from 'react';
import { Typography } from 'antd';
import styled from 'styled-components';
import { withRouter } from 'react-router';

import { getImageUrl } from '../../../utils/cardImage';
import { getPriceLabel } from '../../../utils/cardStats';
import EnlargeImage from './EnlargeImage';

const StyledWrapper = styled.div`
  width: 100%;
  padding: 4px;
  display: flex;
  position: relative;
  align-items: center;
  flex-direction: column;
  justify-content: center;
`;

const StyledImage = styled.img`
  width: 100%;
  height: auto;
  max-width: 90vw;
  border-radius: 4%;
`;

const GridCard = ({ isLarge, card, history }) => {
  const imgSrc = getImageUrl(card.id, card.imgKey, 'normal');
  const onClick = () => {
    history.push(`/m/cards/${card.oracle_id}`);
  };

  const style = isLarge
    ? { fontSize: 16, marginBottom: 8, padding: 20 }
    : { maxWidth: '50%' };

  const { minPrice, name, sumPrice, totalAmount } = card;
  const shouldDisplayTotal = minPrice !== sumPrice;
  const total = shouldDisplayTotal
    ? ` (${getPriceLabel(card.sumPrice)} total)`
    : '';

  const amountLabel = totalAmount > 1 ? ` (${totalAmount}x)` : '';

  return (
    <StyledWrapper style={style} onClick={onClick}>
      <StyledImage src={imgSrc} />
      {!isLarge && <EnlargeImage src={imgSrc} card={card} />}
      <Typography.Text>{getPriceLabel(minPrice) + total}</Typography.Text>
      <Typography.Text ellipsis style={{ maxWidth: '90%' }}>
        {name + amountLabel}
      </Typography.Text>
    </StyledWrapper>
  );
};

const areEqual = (prevProps, nextProps) => {
  if (prevProps.isLarge !== nextProps.isLarge) return false;
  return ['id', 'amount', 'amountFoil', 'totalAmount', 'sumPrice'].every(
    propKey => {
      return prevProps.card[propKey] === nextProps.card[propKey];
    }
  );
};

export default withRouter(React.memo(GridCard, areEqual));
