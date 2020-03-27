import React from 'react';
import { Typography, Row, Col } from 'antd';
import styled from 'styled-components';

import { getImageUrl } from '../../../utils/cardImage';
import { getPriceLabel } from '../../../utils/cardStats';
import EnlargeImage from './EnlargeImage';
import FlippableCard from '../FlippableCard';
import OwnedBadge from '../OwnedBadge';
import EditCard from './EditCard';

const StyledWrapper = styled.div`
  width: 100%;
  padding: 4px;
  display: flex;
  position: relative;
  align-items: center;
  flex-direction: column;
  justify-content: center;
`;

const StyledCardWrapper = styled.div`
  width: ${({ isLarge }) => (isLarge ? '90vw' : '43vw')};
  height: ${({ isLarge }) => (isLarge ? '125vw' : '60vw')};
  border-radius: 3%;
  position: inherit;
`;

const GridCard = ({ isLarge, card, onClick, onEditCard, onDeleteCard }) => {
  const imgSrc = getImageUrl(card.id, card.imgKey, 'normal');

  const style = isLarge
    ? { fontSize: 16, marginBottom: 8, padding: 20 }
    : { maxWidth: '50%' };

  const { minPrice, name, totalAmount, amount } = card;
  const displayedAmount = amount || totalAmount;

  return (
    <StyledWrapper style={style} onClick={onClick}>
      <StyledCardWrapper isLarge={isLarge}>
        <FlippableCard card={card} />
        {!isLarge && <EnlargeImage src={imgSrc} card={card} />}
        {onEditCard && (
          <EditCard
            card={card}
            isLarge={isLarge}
            onEditCard={onEditCard}
            onDeleteCard={onDeleteCard}
          />
        )}
      </StyledCardWrapper>
      <Row style={{ width: '100%', padding: '0 4px' }}>
        <Col span={7}>
          {displayedAmount && (
            <Typography.Text strong>{`${displayedAmount}x `}</Typography.Text>
          )}
        </Col>
        <Col span={9} style={{ display: 'flex', justifyContent: 'center' }}>
          <Typography.Text>{getPriceLabel(minPrice)}</Typography.Text>
        </Col>
        <Col span={8} style={{ display: 'flex', justifyContent: 'flex-end' }}>
          {card.owned && <OwnedBadge marginLeft={0} />}
        </Col>
      </Row>
      <Typography.Text
        ellipsis
        style={{ width: 'calc(100% - 8px)', padding: '0 4px' }}
      >
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
