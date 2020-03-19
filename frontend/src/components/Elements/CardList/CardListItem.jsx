import React from 'react';

import styled from 'styled-components';
import { List, Typography, Row, Col } from 'antd';
import { highlightText } from '../../../utils/highlightText';
import CardListImage from '../CardListImage';
import { getPriceLabel } from '../../../utils/cardStats';

const StyledRow = styled(Row)`
  align-items: center;
  display: flex;
  width: 100%;
`;

const CardListItem = ({ card, searchString, onClick }) => {
  const { minPrice, amount, totalAmount } = card;
  const displayedAmount = amount || totalAmount;
  const hasMinPrice = minPrice !== undefined;
  const amountLabel = displayedAmount > 1 ? displayedAmount : '';

  return (
    <List.Item style={{ padding: '2px 8px', height: 40 }}>
      <StyledRow onClick={onClick}>
        <Col span={3}>
          <CardListImage card={card} />
        </Col>
        <Col span={1}>
          <Typography.Text strong>{amountLabel}</Typography.Text>
        </Col>
        <Col span={hasMinPrice ? 16 : 20}>
          <Typography.Text style={{ display: 'block' }} ellipsis>
            {highlightText(searchString, card.name)}
          </Typography.Text>
        </Col>
        {hasMinPrice && (
          <Col span={4} style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Typography.Text>{getPriceLabel(minPrice)}</Typography.Text>
          </Col>
        )}
      </StyledRow>
    </List.Item>
  );
};

const areEqual = (prevProps, nextProps) => {
  if (prevProps.isOpen !== nextProps.isOpen) return false;

  return ['id', 'amount', 'amountFoil'].every(propKey => {
    return prevProps.card[propKey] === nextProps.card[propKey];
  });
};

export default React.memo(CardListItem, areEqual);
