import React from 'react';
import { Typography, Input } from 'antd';

type AmountKey = 'amountOwned' | 'amountOwnedFoil';

interface Card {
  id: string;
  amountOwned?: number;
  amountOwnedFoil?: number;
  amount?: number;
  totalAmount?: number;
}

export const getEditableAmountInputId = (card: Card, amountKey?: AmountKey) => {
  return `editable-amount-${card.id}-${amountKey || 'amount'}`;
};

interface Props {
  card: Card;
  onChangeAmount: (amount: number, cardId: string, amountKey: AmountKey) => void;
  isEditing: boolean;
  amountKey: AmountKey;
  hideOnes: boolean;
  onPressEnter: () => void;
  autoFocus: boolean;
}

const EditableAmount = ({
  card,
  onChangeAmount,
  isEditing,
  amountKey,
  hideOnes,
  onPressEnter,
  autoFocus,
}: Props) => {
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
        onFocus={(event) => event.target.select()}
        type="number"
        style={{ width: 50 }}
        id={getEditableAmountInputId(card, amountKey)}
        onChange={(e) => onChangeAmount(Number(e.target.value) || 0, card.id, amountKey)}
        onPressEnter={onPressEnter}
        defaultValue={displayedAmount}
        onClick={(e) => e.stopPropagation()}
      />
    );
  }

  return <span>{amountLabel && <Typography.Text>{amountLabel}</Typography.Text>}</span>;
};

export default EditableAmount;
