import React from 'react';

import { Typography, Input } from 'antd';

export default ({ card, onChangeAmount, isEditing }) => {
  const { amount, totalAmount } = card;
  const displayedAmount = amount || totalAmount;
  const amountLabel = displayedAmount > 1 ? `${displayedAmount}x` : '';

  if (!amountLabel && !isEditing) return <span />;

  if (isEditing) {
    return (
      <Input
        size="small"
        type="number"
        style={{ width: 40 }}
        onChange={e => onChangeAmount(Number(e.target.value) || 1)}
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
