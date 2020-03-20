import React from 'react';

import styled from 'styled-components';
import { List, Typography, Row, Col } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { highlightText } from '../../../utils/highlightText';
import CardListImage from '../CardListImage';
import { getPriceLabel } from '../../../utils/cardStats';
import message from '../../../utils/message';

const StyledRow = styled(Row)`
  align-items: center;
  display: flex;
  width: 100%;
  flex-wrap: nowrap;
`;

const CardListItem = ({ card, searchString, onClick, onDeleteElement }) => {
  const { minPrice, amount, totalAmount } = card;
  const displayedAmount = amount || totalAmount;
  const hasMinPrice = minPrice !== undefined;
  const amountLabel = displayedAmount > 1 ? displayedAmount : '';
  let textWidth = 20;
  if (hasMinPrice) textWidth -= 4;
  if (onDeleteElement) textWidth -= 2;

  const onDelete = event => {
    event.stopPropagation();
    onDeleteElement(card.id);
    message(`Deleted <b>${card.name}</b>!`);
  };

  return (
    <List.Item style={{ padding: '2px 8px', height: 40 }}>
      <StyledRow onClick={onClick}>
        <Col span={3}>
          <CardListImage card={card} />
        </Col>
        <Col span={1}>
          <Typography.Text strong>{amountLabel}</Typography.Text>
        </Col>
        <Col
          span={textWidth}
          style={{ transition: 'all 0.2s', willChange: 'max-width' }}
        >
          <Typography.Text style={{ display: 'block' }} ellipsis>
            {highlightText(searchString, card.name)}
          </Typography.Text>
        </Col>
        {hasMinPrice && (
          <Col span={4} style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Typography.Text>{getPriceLabel(minPrice)}</Typography.Text>
          </Col>
        )}
        {onDeleteElement && (
          <Col
            span={2}
            style={{ display: 'flex', justifyContent: 'flex-end' }}
            onClick={onDelete}
          >
            <DeleteOutlined style={{ color: 'rgb(255, 77, 79)' }} />
          </Col>
        )}
      </StyledRow>
    </List.Item>
  );
};

const areEqual = (prevProps, nextProps) => {
  if (prevProps.isOpen !== nextProps.isOpen) return false;
  if (prevProps.onDeleteElement !== nextProps.onDeleteElement) return false;

  return ['id', 'amount', 'amountFoil'].every(propKey => {
    return prevProps.card[propKey] === nextProps.card[propKey];
  });
};

export default React.memo(CardListItem, areEqual);
