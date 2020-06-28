import React from 'react';
import { useQuery, useMutation } from 'react-apollo';
import { Spin, Collapse } from 'antd';

import Flex from '../Flex';
import { allLists } from './queries';
import Lists from './Lists';
import SimpleCardsList from '../SimpleCardsList';
import { addCardsToDeckDesktop } from '../../../Desktop/Deck/queries';
import message from '../../../../utils/message';
import { addToCollectionDesktop } from '../../../Desktop/Collection/Private/queries';
import {
  addCardsToWantsListDesktop,
  wantsListDesktop,
} from '../../../Desktop/WantsList/queries';
import sumCardAmount from '../../../../utils/sumCardAmount';
import FocusedModal from '../FocusedModal';

export default ({
  onCancel,
  onSubmit,
  cardsToAdd,
  numberOfSelectedCards,
  visible,
}) => {
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
    onSubmit();
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
    onSubmit();
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
      refetchQueries: ['paginatedCollection', 'ownedCardNames'],
    });
    onSubmit();
    message(`Added ${sumCardAmount(cards)} cards to your collection!`);
  };

  return (
    <FocusedModal
      visible={visible}
      title="Add cards to..."
      footer={null}
      onCancel={onCancel}
      focusId="modal.addCardsTo"
      bodyStyle={{ maxHeight: '70vh', overflowY: 'auto' }}
    >
      <Flex direction="column">
        <Collapse>
          <Collapse.Panel
            key="1"
            header={
              numberOfSelectedCards && `${numberOfSelectedCards} cards selected`
            }
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
    </FocusedModal>
  );
};
