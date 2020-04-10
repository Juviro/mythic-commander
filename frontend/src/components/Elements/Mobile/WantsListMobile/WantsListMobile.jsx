import React from 'react';
import { useMutation } from 'react-apollo';
import {
  deleteFromWantsList,
  editWantsListCard,
  wantsList as wantsListQuery,
} from './queries';

import FilteredCardList from '../CardListMobile/FilteredCardList';
import { wantsListsForDeckMobile } from '../../../Mobile/Deck/LinkedWants/queries';

export default ({
  cards,
  loading,
  rawWantsList,
  hideFooter,
  moveToList,
  deckId,
}) => {
  const wantsListId = rawWantsList && rawWantsList.id;
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
        const existing = {};
        if (!deckId) {
          existing.wantsList = cache.readQuery({
            query: wantsListQuery,
            variables: { id: wantsListId },
          });
        } else {
          const wantsListsForDeck = cache.readQuery({
            query: wantsListsForDeckMobile,
            variables: { deckId },
          });
          existing.wantsList = wantsListsForDeck.wantsLists.find(
            ({ id }) => id === wantsListId
          );
        }
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
      hideFooter={hideFooter}
      cards={cards}
      loading={loading}
      moveToList={moveToList}
      onEditCard={onEditCard}
      onDeleteCard={onDeleteCard}
    />
  );
};
