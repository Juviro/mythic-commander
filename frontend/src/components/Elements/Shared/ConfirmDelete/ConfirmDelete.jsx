import React from 'react';
import { Modal, List, Typography, Space } from 'antd';
import PreviewCardImage from '../PreviewCardImage';
import useBlockShortcuts from '../../../Hooks/useBlockShortcuts';
import { useShortcut } from '../../../Hooks';

export default ({ onCancel, cardsToDelete, onOk }) => {
  const cardSum = cardsToDelete.reduce((sum, { amount, totalAmount }) => {
    const usedAmount = amount || totalAmount || 1;
    return sum + usedAmount;
  }, 0);

  const onDeleteCards = () => onOk(cardSum);
  useBlockShortcuts();
  useShortcut('ENTER', onDeleteCards, true);
  if (!cardsToDelete.length) return null;

  const title = `Are you sure you want to delete ${cardSum} ${
    cardSum === 1 ? 'card' : 'cards'
  }?`;

  return (
    <Modal
      visible
      title={title}
      okText="Delete"
      okButtonProps={{ type: 'danger', onClick: onDeleteCards }}
      onCancel={onCancel}
      bodyStyle={{ maxHeight: 400, overflowY: 'auto' }}
    >
      <List>
        {cardsToDelete.map(card => (
          <List.Item key={card.id}>
            <Space>
              <PreviewCardImage card={card} />
              <Typography.Text strong>
                {`${card.amount || card.totalAmount || 1}x`}
              </Typography.Text>
              <Typography.Text ellipsis>{card.name}</Typography.Text>
            </Space>
          </List.Item>
        ))}
      </List>
    </Modal>
  );
};
