import React from 'react';
import { Typography } from 'antd';
import styled from 'styled-components';
import { withRouter } from 'react-router';

import { getImageUrl } from '../../../utils/cardImage';
import { highlightText } from '../../../utils/highlightText';
import { getPriceLabel } from '../../../utils/cardStats';

const StyledWrapper = styled.div`
  width: 100%;
  padding: 4px;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
`;

const StyledImage = styled.img`
  width: 100%;
  height: auto;
  max-width: 90vw;
`;

const GridCard = ({ isLarge, card, history, searchString }) => {
  const imgSrc = getImageUrl(card.id, card.imgKey, 'normal');
  const onClick = () => {
    history.push(`/m/cards/${card.oracle_id}`);
  };

  const style = isLarge
    ? { fontSize: 20, marginBottom: 8, padding: 20 }
    : { maxWidth: '50%' };

  return (
    <StyledWrapper style={style} onClick={onClick}>
      <StyledImage src={imgSrc} />
      <Typography.Text>{getPriceLabel(card.minPrice)}</Typography.Text>
      <Typography.Text ellipsis style={{ maxWidth: '90%' }}>
        {highlightText(searchString, card.name)}
      </Typography.Text>
    </StyledWrapper>
  );
};

const areEqual = (prevProps, nextProps) => {
  if (prevProps.isLarge !== nextProps.isLarge) return false;
  return ['id', 'amount', 'amountFoil'].every(propKey => {
    return prevProps.card[propKey] === nextProps.card[propKey];
  });
};

export default withRouter(React.memo(GridCard, areEqual));
