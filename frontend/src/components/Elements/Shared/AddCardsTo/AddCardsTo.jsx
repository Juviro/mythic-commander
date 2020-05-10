import React from 'react';
import { useQuery, useMutation } from 'react-apollo';
import { Modal, Spin, Collapse } from 'antd';

import Flex from '../Flex';
import { allLists } from './queries';
import Lists from './Lists';
import SimpleCardsList from '../SimpleCardsList';
import { addCardsToDeckDesktop } from '../../../Desktop/Deck/queries';
import message from '../../../../utils/message';
import {
  getCollectionDesktop,
  addToCollectionDesktop,
} from '../../../Desktop/Collection/queries';
import {
  addCardsToWantsListDesktop,
  wantsListDesktop,
} from '../../../Desktop/WantsList/queries';
import useBlockShortcuts from '../../../Hooks/useBlockShortcuts';

export default ({ onCancel, cardsToAdd, numberOfSelectedCards }) => {
  useBlockShortcuts();
  const { data, loading } = useQuery(allLists, { fetchPolicy: 'network-only' });
  const [addToDeck] = useMutation(addCardsToDeckDesktop);
  const [addToWantsList] = useMutation(addCardsToWantsListDesktop);
  const [addToCollection] = useMutation(addToCollectionDesktop);

  const formattedCards = cardsToAdd.map(({ id, amount, totalAmount }) => ({
    id,
    amount: amount || totalAmount || 1,
  }));

  const onAddToDeck = (deckId, deckName) => {
    addToDeck({
      variables: { cards: formattedCards, deckId },
    });
    onCancel();
    message(
      `Added <b>${numberOfSelectedCards}</b> cards to <b>${deckName}</b>!`
    );
  };
  const onAddToWantsList = (wantsListId, wantsListName) => {
    addToWantsList({
      variables: { cards: formattedCards, wantsListId },
      refetchQueries: [
        {
          query: wantsListDesktop,
          variables: { id: wantsListId },
        },
      ],
    });
    onCancel();
    message(
      `Added <b>${numberOfSelectedCards}</b> cards to <b>${wantsListName}</b>!`
    );
  };
  const onAddToCollection = cards => {
    const formattedCollectionCards = cards.map(
      ({ id, amount, totalAmount }) => ({
        id,
        amount: amount || totalAmount || 1,
      })
    );
    addToCollection({
      variables: { cards: formattedCollectionCards },
      update: (cache, { data: updateData }) => {
        if (!updateData) return;
        const { addToCollection: newCards } = updateData;
        try {
          const existing = cache.readQuery({
            query: getCollectionDesktop,
          });

          const existingCards = existing.collection.cards.filter(
            ({ card: { oracle_id } }) =>
              !newCards.some(({ card }) => card.oracle_id === oracle_id)
          );

          cache.writeQuery({
            query: getCollectionDesktop,
            data: {
              collection: {
                ...existing.collection,
                cards: [...newCards, ...existingCards],
              },
            },
          });
        } catch {
          // collection has not been queried yet
        }
      },
      refetchQueries: ['getCollectionNames'],
    });
    onCancel();
    message(`Added <b>${numberOfSelectedCards}</b> cards to your collection!`);
  };

  return (
    <Modal
      visible
      title="Add cards to..."
      footer={null}
      onCancel={onCancel}
      bodyStyle={{ maxHeight: '70vh', overflowY: 'auto' }}
    >
      <Flex direction="column">
        <Collapse>
          <Collapse.Panel
            key="1"
            header={`${numberOfSelectedCards} cards selected`}
          >
            <SimpleCardsList cards={cardsToAdd} />
          </Collapse.Panel>
        </Collapse>
        {loading ? (
          <Flex align="center" justify="center" style={{ height: 200 }}>
            <Spin />
          </Flex>
        ) : (
          <Lists
            data={data}
            cardsToAdd={cardsToAdd}
            onAddToDeck={onAddToDeck}
            onAddToWantsList={onAddToWantsList}
            onAddToCollection={onAddToCollection}
          />
        )}
      </Flex>
    </Modal>
  );
};
