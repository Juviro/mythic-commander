import React from 'react';
import { InputNumber } from 'antd';
import { useParams } from 'react-router';
import { useMutation } from 'react-apollo';
import { editDeckCard } from '../../../../queries';

export default ({ card }) => {
  const { id: deckId } = useParams();
  const [editMutation] = useMutation(editDeckCard);

  const onSetAmount = event => {
    const amount = Number(event.target.value);
    editMutation({
      variables: {
        deckId,
        cardId: card.id,
        newProps: { amount },
      },
    });
  };

  return (
    <InputNumber
      min={1}
      max={99}
      size="small"
      style={{ marginTop: 4, width: '100%' }}
      defaultValue={card.amount}
      onBlur={onSetAmount}
      onPressEnter={onSetAmount}
    />
  );
};
