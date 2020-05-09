import React from 'react';
import { Input } from 'antd';

export default ({ canSubmit, card, size, onSubmit, onChange }) => {
  const displayedAmount = card.amount || card.totalAmount;

  return (
    <Input
      size={size}
      addonBefore={size !== 'small' ? 'Amount' : undefined}
      style={{ width: '100%' }}
      defaultValue={displayedAmount}
      onPressEnter={canSubmit && onSubmit ? onSubmit : undefined}
      onChange={e => onChange(Number(e.target.value) || 1)}
    />
  );
};
