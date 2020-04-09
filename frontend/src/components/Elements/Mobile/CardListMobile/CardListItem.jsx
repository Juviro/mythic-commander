import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { List, Typography, Menu, Dropdown, Row, Col } from 'antd';
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
import { MoveToModal, ManaCost } from '../../Shared';
import { primary } from '../../../../constants/colors';

const StyledDescription = styled.div`
  display: flex;
  align-items: center;
  min-height: 24px;
  justify-content: space-between;
`;

const StyledManaCost = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

export default ({
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
          <Icon style={{ color: primary }} />
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

  const action = isEditing ? (
    <SaveOutlined onClick={onToggleEditing} style={{ color: primary }} />
  ) : menuItems.length ? (
    menuIcon
  ) : (
    undefined
  );

  const showManaCosts = typeof card.mana_cost === 'string';

  return (
    <List.Item
      actions={[action]}
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
          <Row>
            {showManaCosts && (
              <Col span={12}>
                <StyledManaCost>
                  <ManaCost costString={card.mana_cost} size={14} />
                </StyledManaCost>
              </Col>
            )}
            <Col span={6}>
              <EditableAmount
                hideOnes
                card={card}
                onChangeAmount={onChangeProp('amount')}
                isEditing={isEditing}
              />
            </Col>
            <Col
              span={6}
              style={{ display: 'flex', justifyContent: 'flex-end' }}
            >
              {isEditing ? (
                <SetPicker
                  width={150}
                  card={card}
                  onSelect={onChangeProp('id')}
                />
              ) : (
                !owned && <OwnedBadge marginLeft={0} />
              )}
            </Col>
          </Row>
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
