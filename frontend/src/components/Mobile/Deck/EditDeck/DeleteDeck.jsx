import React from 'react';
import { List, Modal, message } from 'antd';
import { useMutation } from 'react-apollo';
import { useParams, withRouter } from 'react-router';

import { deleteDeck, getDecks } from '../../../../queries';
import { useToggle } from '../../../Hooks';

const DeleteDeck = ({ history }) => {
  const { id: deckId } = useParams();
  const [isModalVisible, toggleIsModalVisible] = useToggle(false);
  const [deleteDeckMutation] = useMutation(deleteDeck);

  const onDeleteDeck = async () => {
    await deleteDeckMutation({
      variables: {
        deckId,
      },
      refetchQueries: ['wantsListsMobile'],
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
        onClick={() => toggleIsModalVisible(true)}
        style={{ color: '#ff4d4f' }}
      >
        Delete Deck
      </List.Item>
      <Modal
        title="Are you sure you want to delete this deck?"
        visible={isModalVisible}
        okText="Delete"
        onOk={onDeleteDeck}
        onCancel={() => toggleIsModalVisible(false)}
        bodyStyle={{ display: 'none' }}
        okButtonProps={{ type: 'danger' }}
      />
    </>
  );
};

export default withRouter(DeleteDeck);
