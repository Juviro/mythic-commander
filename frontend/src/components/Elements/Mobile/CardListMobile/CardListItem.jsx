import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { List, Typography, Menu, Dropdown } from 'antd';
import {
  DeleteOutlined,
  EditOutlined,
  SaveOutlined,
  MoreOutlined,
  SwapRightOutlined,
} from '@ant-design/icons';

import { highlightText } from '../../../../utils/highlightText';
import { getPriceLabel } from '../../../../utils/cardStats';
import message from '../../../../utils/message';
import PreviewCardImage from '../../Shared/PreviewCardImage';
import OwnedBadge from '../../Shared/OwnedBadge';
import SetPicker from '../../Shared/SetPicker';
import EditableAmount from '../../Shared/EditableAmount';
import { useToggle } from '../../../Hooks';
import { MoveToModal } from '../../Shared';

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
  moveToList,
}) => {
  const [isMenuOpen, toggleIsMenuOpen] = useToggle();
  const [isEditing, toggleIsEditing] = useToggle();
  const [isMovingCard, toggleIsMovingCard] = useToggle();
  const [newProps, setNewProps] = useState({});

  const { minPrice, owned } = card;
  const hasMinPrice = minPrice !== undefined;
  const cardId = card.id;

  useEffect(() => {
    toggleIsEditing(false);
    // eslint-disable-next-line
  }, [cardId]);

  const onDelete = () => {
    onDeleteCard(card.id);
    message(`Deleted <b>${card.name}</b>!`);
  };

  const onToggleEditing = () => {
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

  const menuItems = [];

  if (onEditCard) {
    menuItems.push({
      Icon: EditOutlined,
      onClick: onToggleEditing,
      title: 'Edit',
    });
  }
  if (moveToList) {
    menuItems.push({
      Icon: SwapRightOutlined,
      onClick: toggleIsMovingCard,
      title: 'Move to...',
    });
  }
  if (onDeleteCard) {
    menuItems.push({
      Icon: DeleteOutlined,
      onClick: onDelete,
      title: 'Delete',
    });
  }

  const menu = (
    <Menu onClick={toggleIsMenuOpen}>
      {menuItems.map(({ Icon, title, onClick: onClickItem }) => (
        <Menu.Item
          key={title}
          onClick={({ domEvent }) => {
            domEvent.stopPropagation();
            onClickItem();
          }}
        >
          <Icon style={{ color: '#1890ff' }} />
          {title}
        </Menu.Item>
      ))}
    </Menu>
  );

  const menuIcon = (
    <Dropdown
      overlay={menu}
      visible={isMenuOpen}
      onVisibleChange={toggleIsMenuOpen}
      onClick={e => e.stopPropagation()}
    >
      <MoreOutlined onClick={toggleIsMenuOpen} style={{ fontSize: 18 }} />
    </Dropdown>
  );

  const actions = isEditing ? (
    <SaveOutlined onClick={onToggleEditing} style={{ color: '#1890ff' }} />
  ) : menuItems.length ? (
    menuIcon
  ) : (
    undefined
  );

  return (
    <List.Item
      actions={[actions]}
      style={{ padding: 4 }}
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
      <MoveToModal
        visible={isMovingCard}
        onCancel={toggleIsMovingCard}
        moveToList={moveToList}
        card={card}
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
