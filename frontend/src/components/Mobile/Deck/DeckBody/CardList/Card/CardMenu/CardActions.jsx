import React from 'react';
import { List, Icon } from 'antd';
import { useMutation } from 'react-apollo';
import { useParams } from 'react-router';

import { editDeckCard, deleteFromDeck } from '../../../../../../../queries';

export default ({ card }) => {
  const { owned } = card;
  const { id: deckId } = useParams();
  const [onDeleteMutation] = useMutation(deleteFromDeck);
  const [editMutation] = useMutation(editDeckCard);

  const onToggleOwned = () => {
    editMutation({
      variables: {
        deckId,
        cardOracleId: card.oracle_id,
        newProps: { owned: !owned },
      },
    });
  };
  const onDelete = () => {
    onDeleteMutation({ variables: { cardId: card.id, deckId } });
  };

  const listItems = [
    {
      label: owned ? 'Remove from collection' : 'Add to collection',
      onClick: onToggleOwned,
      icon: owned ? 'minus' : 'plus',
    },
    {
      label: 'Remove from deck',
      onClick: onDelete,
      icon: 'delete',
    },
  ];

  return (
    <List
      size="small"
      dataSource={listItems}
      renderItem={({ onClick, label, icon }) => (
        <List.Item onClick={onClick} style={{ fontSize: 12, color: '#1890ff' }}>
          <Icon type={icon} style={{ marginRight: 4 }} />
          {label}
        </List.Item>
      )}
    />
  );
};
