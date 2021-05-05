import React, { useState } from 'react';
import { useMutation } from 'react-apollo';

import { useQuery } from '@apollo/react-hooks';
import { withRouter } from 'react-router';
import Flex from '../../Flex';
import { addCardsToDeckDesktop } from '../../../../Desktop/Deck/queries';
import message from '../../../../../utils/message';
import { addToCollectionDesktop } from '../../../../Desktop/Collection/queries';
import {
  addCardsToWantsListDesktop,
  wantsListDesktop,
} from '../../../../Desktop/WantsList/queries';
import sumCardAmount from '../../../../../utils/sumCardAmount';
import ButtonGroup from '../../ButtonGroup/ButtonGroup';
import Lists from './Lists';
import { allLists } from '../queries';
import { TYPES } from '../../../../../constants/types';

const formatCards = (cards) =>
  cards.map(({ id, amount, totalAmount }) => ({
    id,
    amount: amount || totalAmount || 1,
  }));

const ListSelection = ({ onSubmit, selectedCards, history }) => {
  const { data, loading } = useQuery(allLists, { fetchPolicy: 'network-only' });

  const [addToDeck] = useMutation(addCardsToDeckDesktop);
  const [addToWantsList] = useMutation(addCardsToWantsListDesktop);
  const [addToCollection] = useMutation(addToCollectionDesktop);

  const [currentList, setCurrentList] = useState(null);

  const numberOfSelectedCards = sumCardAmount(selectedCards);

  const onAddToDeck = (deckId, deckName) => {
    addToDeck({
      variables: { cards: formatCards(selectedCards), deckId },
    });
    onSubmit();
    message(`Added <b>${numberOfSelectedCards}</b> cards to <b>${deckName}</b>!`);
  };
  const onAddToWantsList = (wantsListId, wantsListName) => {
    addToWantsList({
      variables: { cards: formatCards(selectedCards), wantsListId },
      refetchQueries: [
        {
          query: wantsListDesktop,
          variables: { id: wantsListId },
        },
      ],
    });
    onSubmit();
    message(`Added <b>${numberOfSelectedCards}</b> cards to <b>${wantsListName}</b>!`);
  };
  const onAddToCollection = () => {
    const formattedCollectionCards = selectedCards.map(({ id, amount, totalAmount }) => ({
      id,
      amount: amount || totalAmount || 1,
    }));
    addToCollection({
      variables: { cards: formattedCollectionCards },
      refetchQueries: ['paginatedCollection'],
    });
    onSubmit();
    message(`Added ${numberOfSelectedCards} cards to your collection!`);
  };

  const onAddFunctions = {
    [TYPES.DECK]: onAddToDeck,
    [TYPES.WANTS]: onAddToWantsList,
    [TYPES.COLLECTION]: onAddToCollection,
  };

  const onAddCards = onAddFunctions[currentList];

  let buttons = [
    {
      label: 'Add to Deck...',
      onClick: () => setCurrentList(TYPES.DECK),
    },
    {
      label: 'Add to Wants...',
      onClick: () => setCurrentList(TYPES.WANTS),
    },
  ];

  const isCollection = Boolean(history.location.pathname.match(/^\/collection/));
  if (!isCollection) {
    buttons = [
      {
        label: 'Add to Collection',
        onClick: onAddToCollection,
      },
      ...buttons,
    ];
  }

  return (
    <Flex style={{ width: 250, height: '100%' }}>
      {!currentList ? (
        <ButtonGroup buttons={buttons} />
      ) : (
        <Lists
          onAddCards={onAddCards}
          data={data}
          loading={loading}
          type={currentList}
          onBack={() => setCurrentList()}
        />
      )}
    </Flex>
  );
};

export default withRouter(ListSelection);
