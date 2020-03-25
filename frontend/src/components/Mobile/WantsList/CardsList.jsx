import React from 'react';
import { useMutation } from 'react-apollo';
import { useParams } from 'react-router';
import {
  deleteFromWantsList,
  editWantsListCard,
  wantsList as wantsListQuery,
} from './queries';

import FilteredCardList from '../../Elements/CardList/FilteredCardList';

export default ({ basePath, cards, loading, wantsList }) => {
  const { id: wantsListId } = useParams();
  const [mutateDelete] = useMutation(deleteFromWantsList);
  const [mutateEdit] = useMutation(editWantsListCard);

  const onDeleteWant = cardId => {
    const newCards = wantsList.cards.filter(card => card.id !== cardId);
    const newNumberOfCards = wantsList.numberOfCards;
    mutateDelete({
      variables: { cardId, wantsListId },
      optimisticResponse: () => ({
        __typename: 'Mutation',
        deleteFromWantsList: {
          ...wantsList,
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
          if (card.id !== cardId) return card;
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
      basePath={basePath}
      onChangeElement={onEditCard}
      onDeleteElement={onDeleteWant}
    />
  );
};
