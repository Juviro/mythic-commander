import React from 'react';
import { Typography, Row, Col } from 'antd';
import styled from 'styled-components';

import { useQueryParam, StringParam } from 'use-query-params';
import { getImageUrl } from '../../../../utils/cardImage';
import { getPriceLabel } from '../../../../utils/cardStats';
import EnlargeImage from './EnlargeImage';
import FlippableCard from '../../Shared/FlippableCard';
import OwnedBadge from '../../Shared/OwnedBadge';
import { highlightText } from '../../../../utils/highlightText';
import EditGridCard from '../../Shared/EditGridCard';
import { LazyLoad } from '../../Shared';

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

const GridCard = ({ moveToList, isLarge, card, onClick, onEditCard, onDeleteCard }) => {
  const imgSrc = getImageUrl(card.id, card.imgKey, 'normal');
  const [query] = useQueryParam('name', StringParam);

  const style = isLarge
    ? { fontSize: 16, marginBottom: 8, padding: 20 }
    : { maxWidth: '50%' };

  const { minPrice, name, totalAmount, amount, sumPrice, owned } = card;
  const displayedAmount = amount || totalAmount;

  const width = isLarge ? '100%' : '43vw';

  return (
    <StyledWrapper style={style} onClick={onClick}>
      <StyledCardWrapper isLarge={isLarge}>
        <LazyLoad offset={100} height={isLarge ? 500 : 250} animationDuration={0.5}>
          <div style={{ width: '100%', height: '100%' }}>
            <FlippableCard card={card} />
          </div>
        </LazyLoad>
        {!isLarge && <EnlargeImage src={imgSrc} card={card} />}
        <EditGridCard
          card={card}
          isLarge={isLarge}
          moveToList={moveToList}
          onEditCard={onEditCard}
          onDeleteCard={onDeleteCard}
        />
      </StyledCardWrapper>
      <Row style={{ width }}>
        <Col span={7}>
          {displayedAmount && (
            <Typography.Text strong>{`${displayedAmount}x `}</Typography.Text>
          )}
        </Col>
        <Col
          span={sumPrice ? 6 : 9}
          style={{ display: 'flex', justifyContent: 'center' }}
        >
          <Typography.Text>{getPriceLabel(minPrice)}</Typography.Text>
        </Col>
        <Col
          span={sumPrice ? 11 : 8}
          style={{ display: 'flex', justifyContent: 'flex-end' }}
        >
          {owned && <OwnedBadge marginLeft={0} />}
          {sumPrice && sumPrice !== minPrice && (
            <Typography.Text>{`(${getPriceLabel(sumPrice)})`}</Typography.Text>
          )}
        </Col>
      </Row>
      <Typography.Text ellipsis style={{ width }}>
        {highlightText(query, name)}
      </Typography.Text>
    </StyledWrapper>
  );
};

const areEqual = (prevProps, nextProps) => {
  if (prevProps.moveToList !== nextProps.moveToList) return false;
  if (prevProps.searchString !== nextProps.searchString) return false;
  if (prevProps.onDeleteCard !== nextProps.onDeleteCard) return false;
  if (prevProps.onEditCard !== nextProps.onEditCard) return false;
  if (prevProps.isLarge !== nextProps.isLarge) return false;

  return ['id', 'amount', 'owned', 'totalAmount', 'sumPrice', 'minPrice'].every(
    propKey => {
      return prevProps.card[propKey] === nextProps.card[propKey];
    }
  );
};
export default React.memo(GridCard, areEqual);
