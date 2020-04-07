import React from 'react';
import { Typography, Input } from 'antd';

export default ({
  card,
  onChangeAmount,
  isEditing,
  amountKey,
  hideOnes,
  onPressEnter,
  autoFocus,
}) => {
  const { amount, totalAmount } = card;
  const displayedAmount = card[amountKey] || amount || totalAmount || 0;
  const amountLabel = !displayedAmount
    ? ''
    : displayedAmount > 1 || !hideOnes
    ? `${displayedAmount}x`
    : '';

  if (!amountLabel && !isEditing) return <span />;

  if (isEditing) {
    return (
      <Input
        size="small"
        min={0}
        autoFocus={autoFocus}
        onFocus={event => event.target.select()}
        type="number"
        style={{ width: 50 }}
        onChange={e =>
          onChangeAmount(Number(e.target.value) || 0, card.id, amountKey)
        }
        onPressEnter={onPressEnter}
        defaultValue={displayedAmount}
        onClick={e => e.stopPropagation()}
      />
    );
  }

  return (
    <span>
      {amountLabel && <Typography.Text>{amountLabel}</Typography.Text>}
    </span>
  );
};
