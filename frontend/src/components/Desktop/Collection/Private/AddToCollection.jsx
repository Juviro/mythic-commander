import React from 'react';
import { useMutation } from 'react-apollo';

import { AddCards } from '../../../Elements/Desktop';
import message from '../../../../utils/message';
import { addToCollectionDesktop, getCollectionDesktop } from './queries';

export default () => {
  const [mutate] = useMutation(addToCollectionDesktop);

  const onAddCards = (cards, name) => {
    const addedName = name || `${cards.length} cards`;
    message(`Added <b>${addedName}</b> to your collection!`);
    mutate({
      variables: { cards },
      update: (cache, { data: updateData }) => {
        if (!updateData) return;
        const { addToCollection: newCards } = updateData;
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
      },
    });
  };

  return <AddCards onAddCards={onAddCards} autoFocus={false} />;
};
