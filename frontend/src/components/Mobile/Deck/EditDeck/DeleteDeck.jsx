import React, { useState } from 'react';
import { List, Modal, message } from 'antd';
import { useMutation } from 'react-apollo';
import { useParams, withRouter } from 'react-router';

import { deleteDeck, getDecks } from '../../../../queries';

const DeleteDeck = ({ history }) => {
  const { id: deckId } = useParams();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [deleteDeckMutation] = useMutation(deleteDeck);

  const onDeleteDeck = async () => {
    await deleteDeckMutation({
      variables: {
        deckId,
      },
      update: cache => {
        const existing = cache.readQuery({
          query: getDecks,
        });

        cache.writeQuery({
          query: getDecks,
          data: {
            decks: existing.decks.filter(({ id }) => id !== deckId),
          },
        });
      },
    });
    message.success('Deck deleted!');
    history.push(`/m/decks`);
  };

  return (
    <>
      <List.Item
        onClick={() => setIsModalVisible(true)}
        style={{ color: '#ff4d4f', padding: 16 }}
      >
        Delete Deck
      </List.Item>
      <Modal
        title="Are you sure you want to delete this deck?"
        visible={isModalVisible}
        okText="Delete"
        onOk={onDeleteDeck}
        onCancel={() => setIsModalVisible(false)}
        bodyStyle={{ display: 'none' }}
        okButtonProps={{ type: 'danger' }}
      />
    </>
  );
};

export default withRouter(DeleteDeck);
