import React from 'react';
import { Modal, List, Typography, Space } from 'antd';
import PreviewCardImage from '../PreviewCardImage';

export default ({ onCancel, cardsToDelete, onOk }) => {
  if (!cardsToDelete) return null;

  const cardSum = cardsToDelete.reduce((sum, { amount, totalAmount }) => {
    const usedAmount = amount || totalAmount || 1;
    return sum + usedAmount;
  }, 0);

  const title = `Are you sure you want these ${cardSum} cards?`;

  return (
    <Modal
      visible
      title={title}
      okText="Delete"
      okButtonProps={{ type: 'danger', onClick: onOk }}
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
