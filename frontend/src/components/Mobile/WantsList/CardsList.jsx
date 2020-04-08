import React from 'react';
import { useMutation } from 'react-apollo';
import { useParams } from 'react-router';
import {
  deleteFromWantsList,
  editWantsListCard,
  wantsList as wantsListQuery,
} from './queries';

import { FilteredCardList } from '../../Elements/Mobile';

export default ({ cards, loading, rawWantsList }) => {
  const { id: wantsListId } = useParams();
  const [mutateDelete] = useMutation(deleteFromWantsList);
  const [mutateEdit] = useMutation(editWantsListCard);

  const onDeleteCard = cardId => {
    const newCards = rawWantsList.cards.filter(card => card.id !== cardId);
    const newNumberOfCards = rawWantsList.numberOfCards;
    mutateDelete({
      variables: { cardId, wantsListId },
      optimisticResponse: () => ({
        __typename: 'Mutation',
        deleteFromWantsList: {
          ...rawWantsList,
          cards: newCards,
          numberOfCards: newNumberOfCards,
        },
      }),
    });
  };

  const onEditCard = (cardId, newProps) => {
    mutateEdit({
      variables: { wantsListId, newProps, cardId },
      update: (cache, { data }) => {
        const existing = cache.readQuery({
          query: wantsListQuery,
          variables: { id: wantsListId },
        });
        const { editWantsListCard: newCard } = data;

        const newCards = existing.wantsList.cards.map(card => {
          if (card.card.id !== cardId) return card;
          return newCard;
        });

        cache.writeQuery({
          query: wantsListQuery,
          data: {
            wantsList: {
              ...existing.wantsList,
              cards: newCards,
            },
          },
        });
      },
    });
  };

  return (
    <FilteredCardList
      cards={cards}
      loading={loading}
      onEditCard={onEditCard}
      onDeleteCard={onDeleteCard}
    />
  );
};
