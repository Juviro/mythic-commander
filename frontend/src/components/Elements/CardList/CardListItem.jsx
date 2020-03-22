import React from 'react';

import styled from 'styled-components';
import { List, Typography } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { highlightText } from '../../../utils/highlightText';
import { getPriceLabel } from '../../../utils/cardStats';
import message from '../../../utils/message';
import PreviewCardImage from '../PreviewCardImage';
import OwnedBadge from '../OwnedBadge';

const StyledDescription = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const CardListItem = ({ card, searchString, onClick, onDeleteElement }) => {
  const { minPrice, amount, totalAmount, owned } = card;
  const displayedAmount = amount || totalAmount;
  const hasMinPrice = minPrice !== undefined;
  const amountLabel = displayedAmount > 1 ? `${displayedAmount}x` : '';

  const onDelete = event => {
    event.stopPropagation();
    onDeleteElement(card.id);
    message(`Deleted <b>${card.name}</b>!`);
  };

  const actions = [];
  if (hasMinPrice) {
    actions.push(<Typography.Text>{getPriceLabel(minPrice)}</Typography.Text>);
  }
  if (onDeleteElement) {
    actions.push(
      <DeleteOutlined
        onClick={onDelete}
        style={{ color: 'rgb(255, 77, 79)' }}
      />
    );
  }

  return (
    <List.Item
      actions={actions}
      style={{ paddingTop: 4, paddingBottom: 4 }}
      onClick={onClick}
    >
      <List.Item.Meta
        style={{ overflow: 'hidden' }}
        title={
          <Typography.Text style={{ display: 'block' }} ellipsis>
            {highlightText(searchString, card.name)}
          </Typography.Text>
        }
        avatar={<PreviewCardImage height="48px" card={card} />}
        description={
          <StyledDescription>
            <span>
              {amountLabel && <Typography.Text>{amountLabel}</Typography.Text>}
            </span>
            <span>{owned && <OwnedBadge marginLeft={0} />}</span>
          </StyledDescription>
        }
      />
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
