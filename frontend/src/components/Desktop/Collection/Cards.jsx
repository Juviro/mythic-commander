import React from 'react';
import { useMutation } from 'react-apollo';

import message from '../../../utils/message';
import { CardListWithDelete } from '../../Elements/Desktop';
import { deleteAllFromCollection, getCollectionDesktop } from './queries';

export default ({ cards, loading, isSidebarVisible }) => {
  const [mutate] = useMutation(deleteAllFromCollection);
  const widthOffset = isSidebarVisible ? 300 : 0;

  const deleteByOracle = (cardIdsToDelete, numberOfCards) => {
    const oracleIds = cardIdsToDelete;
    const numberOfCardsLabel =
      numberOfCards > 1 ? `<b>${numberOfCards}</b> cards` : '';

    message(`Deleted ${numberOfCardsLabel} from your collection!`);
    mutate({
      variables: { oracleIds },
      update: cache => {
        const existing = cache.readQuery({
          query: getCollectionDesktop,
        });

        const updatedCards = existing.collection.cards.filter(
          ({ card }) =>
            !oracleIds.some(oracle_id => card.oracle_id === oracle_id)
        );

        cache.writeQuery({
          query: getCollectionDesktop,
          data: {
            collection: {
              ...existing.collection,
              cards: updatedCards,
            },
          },
        });
      },
    });
  };

  return (
    <CardListWithDelete
      deleteByOracle={deleteByOracle}
      loading={loading}
      cards={cards}
      widthOffset={widthOffset}
    />
  );
};
