import React from 'react';
import { Button, Popconfirm } from 'antd';
import { useParams, withRouter } from 'react-router';
import { useMutation } from 'react-apollo';

import { QuestionCircleOutlined } from '@ant-design/icons';
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
      icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
      onConfirm={onDeleteDeck}
    >
      <Button type="danger">Delete Deck</Button>
    </Popconfirm>
  );
};

export default withRouter(DeleteDeck);
