import React from 'react';
import { Modal, message, Button } from 'antd';
import { useMutation } from 'react-apollo';
import { useParams, withRouter } from 'react-router';

import { useToggle } from '../../../Hooks';
import boldText from '../../../../utils/boldText';
import { deleteDeck, getDecks } from '../../../../queries';
import getDynamicUrl from '../../../../utils/getDynamicUrl';

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
        try {
          const existing = cache.readQuery({
            query: getDecks,
          });

          cache.writeQuery({
            query: getDecks,
            data: {
              decks: existing.decks.filter(({ id }) => id !== deckId),
            },
          });
        } catch {
          // decks have not been queried yet
        }
      },
    });
    message.success('Deck deleted!');
    history.push(getDynamicUrl('/decks'));
  };

  return (
    <>
      <Button type="link" onClick={toggleIsModalVisible} danger>
        Delete Deck
      </Button>
      <Modal
        title="Are you sure you want to delete this deck?"
        visible={isModalVisible}
        okText="Delete"
        onOk={onDeleteDeck}
        onCancel={() => toggleIsModalVisible(false)}
        okButtonProps={{ type: 'danger' }}
        bodyStyle={{ padding: '8px 24px' }}
      >
        {boldText(
          'This will also delete <b>all linked wants lists</b> and cannot be undone.'
        )}
      </Modal>
    </>
  );
};

export default withRouter(DeleteDeck);
