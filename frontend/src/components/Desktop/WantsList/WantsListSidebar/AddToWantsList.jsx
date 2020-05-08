import React from 'react';
import { useMutation } from 'react-apollo';

import { useParams } from 'react-router';
import { AddCards } from '../../../Elements/Desktop';
import message from '../../../../utils/message';
import { addCardsToWantsListDesktop, wantsListDesktop } from '../queries';

export default ({ cards: containedCards = [] }) => {
  const { id: wantsListId } = useParams();
  const [mutate] = useMutation(addCardsToWantsListDesktop);

  const onAddCards = (cards, name) => {
    const addedName = name || `${cards.length} cards`;
    message(`Added <b>${addedName}</b>!`);
    mutate({
      variables: {
        wantsListId,
        cards,
      },
      update: (cache, { data }) => {
        if (!data) return;
        const { addCardsToWantsList: newCards } = data;
        const existing = cache.readQuery({
          query: wantsListDesktop,
          variables: { id: wantsListId },
        });

        const existingCards = existing.wantsList.cards.filter(
          ({ card: { oracle_id } }) =>
            !newCards.some(newCard => newCard.card.oracle_id === oracle_id)
        );

        cache.writeQuery({
          query: wantsListDesktop,
          data: {
            wantsList: {
              ...existing.wantsList,
              cards: existingCards.concat(newCards),
            },
          },
        });
      },
    });
  };

  const containedCardNames = containedCards.map(({ name }) => name);

  return (
    <AddCards
      containedCardNames={containedCardNames}
      onAddCards={onAddCards}
      autoFocus={false}
    />
  );
};
