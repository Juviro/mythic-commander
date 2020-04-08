import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { List, Typography } from 'antd';
import { DeleteOutlined, EditOutlined, SaveOutlined } from '@ant-design/icons';

import { highlightText } from '../../../../utils/highlightText';
import { getPriceLabel } from '../../../../utils/cardStats';
import message from '../../../../utils/message';
import PreviewCardImage from '../../Shared/PreviewCardImage';
import OwnedBadge from '../../Shared/OwnedBadge';
import SetPicker from '../../Shared/SetPicker';
import EditableAmount from '../../Shared/EditableAmount';
import { useToggle } from '../../../Hooks';

const StyledDescription = styled.div`
  display: flex;
  align-items: center;
  min-height: 24px;
  justify-content: space-between;
`;

const CardListItem = ({
  card,
  searchString,
  onClick,
  onDeleteCard,
  onEditCard,
}) => {
  const [isEditing, toggleIsEditing] = useToggle(false);
  const [newProps, setNewProps] = useState({});

  const { minPrice, owned } = card;
  const hasMinPrice = minPrice !== undefined;
  const cardId = card.id;

  useEffect(() => {
    toggleIsEditing(false);
    // eslint-disable-next-line
  }, [cardId]);

  const onDelete = event => {
    event.stopPropagation();
    onDeleteCard(card.id);
    message(`Deleted <b>${card.name}</b>!`);
  };

  const onToggleEditing = event => {
    event.stopPropagation();
    if (isEditing && Object.keys(newProps).length) {
      onEditCard(card.id, newProps);
      setNewProps({});
    }
    toggleIsEditing();
  };

  const onChangeProp = key => value => {
    setNewProps({
      ...newProps,
      [key]: value,
    });
  };

  const actions = [];

  if (isEditing && onDelete) {
    actions.push(
      <DeleteOutlined
        onClick={onDelete}
        type="danger"
        style={{ color: 'rgb(255, 77, 79)' }}
      />
    );
  }
  if (onEditCard) {
    const Icon = isEditing ? SaveOutlined : EditOutlined;
    actions.push(
      <Icon onClick={onToggleEditing} style={{ color: '#40a9ff' }} />
    );
  }

  return (
    <List.Item
      actions={actions}
      style={{ padding: '0 4px' }}
      onClick={!isEditing ? onClick : undefined}
    >
      <List.Item.Meta
        style={{ overflow: 'hidden' }}
        title={
          <StyledDescription>
            <Typography.Text style={{ display: 'block' }} ellipsis>
              {highlightText(searchString, card.name)}
            </Typography.Text>
            {hasMinPrice && !isEditing && (
              <Typography.Text>{getPriceLabel(minPrice)}</Typography.Text>
            )}
          </StyledDescription>
        }
        avatar={<PreviewCardImage height="48px" card={card} />}
        description={
          <StyledDescription>
            <EditableAmount
              hideOnes
              card={card}
              onChangeAmount={onChangeProp('amount')}
              isEditing={isEditing}
            />
            <span style={{ marginRight: 4 }}>
              {isEditing ? (
                <SetPicker
                  width={150}
                  card={card}
                  onSelect={onChangeProp('id')}
                />
              ) : (
                owned && <OwnedBadge marginLeft={0} />
              )}
            </span>
          </StyledDescription>
        }
      />
    </List.Item>
  );
};

const areEqual = (prevProps, nextProps) => {
  if (prevProps.searchString !== nextProps.searchString) return false;

  return ['id', 'amount', 'owned', 'totalAmount', 'sumPrice', 'minPrice'].every(
    propKey => {
      return prevProps.card[propKey] === nextProps.card[propKey];
    }
  );
};

export default React.memo(CardListItem, areEqual);
