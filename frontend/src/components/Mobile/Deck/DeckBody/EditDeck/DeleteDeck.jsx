import React, { useState } from 'react';
import { List, Modal } from 'antd';
import { useMutation } from 'react-apollo';
import { useParams, withRouter } from 'react-router';

import { deleteDeck } from '../../../../../queries';

const DeleteDeck = ({ history }) => {
  const { id: deckId } = useParams();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [deleteDeckMutation] = useMutation(deleteDeck);

  const onDeleteDeck = async () => {
    await deleteDeckMutation({
      variables: {
        deckId,
      },
    });
    history.push(`/m/decks`);
  };

  return (
    <>
      <List.Item onClick={() => setIsModalVisible(true)} style={{ color: '#ff4d4f', padding: 16 }}>
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
