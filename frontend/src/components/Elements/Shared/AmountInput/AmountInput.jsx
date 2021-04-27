import React from 'react';
import { Input } from 'antd';

export default ({
  canSubmit,
  card,
  size,
  onSubmit,
  onChange,
  autoFocus,
  style,
  hideText,
}) => {
  const displayedAmount = card.amount || card.totalAmount;

  return (
    <Input
      size={size}
      type="number"
      autoFocus={autoFocus}
      addonBefore={size !== 'small' && !hideText ? 'Amount' : undefined}
      style={{ width: '100%', ...style }}
      min={1}
      defaultValue={displayedAmount}
      onPressEnter={canSubmit && onSubmit ? onSubmit : undefined}
      onChange={(e) => onChange(Number(e.target.value) || 1)}
    />
  );
};
