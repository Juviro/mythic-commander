import React from 'react';
import { Button, Popconfirm, Icon } from 'antd';
import { useParams, withRouter } from 'react-router';
import { useMutation } from 'react-apollo';

import { deleteDeck } from '../../../../../queries/deck';

const DeleteDeck = ({ history }) => {
  const { id: deckId } = useParams();
  const [deleteDeckMutation] = useMutation(deleteDeck);

  const onDeleteDeck = async () => {
    await deleteDeckMutation({
      variables: {
        deckId,
      },
    });
    history.push('/decks');
  };

  return (
    <Popconfirm
      placement="topLeft"
      title="Are you sure？This can not be undone"
      icon={<Icon type="question-circle" style={{ color: 'red' }} />}
      onConfirm={onDeleteDeck}
    >
      <Button type="danger">Delete Deck</Button>
    </Popconfirm>
  );
};

export default withRouter(DeleteDeck);
