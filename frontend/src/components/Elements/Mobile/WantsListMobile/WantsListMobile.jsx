import React from 'react';
import { useMutation } from 'react-apollo';
import message from 'utils/message';
import {
  deleteFromWantsListMobile as deleteFromWantsList,
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
  canEdit,
  paginated,
}) => {
  const wantsListId = rawWantsList && rawWantsList.id;
  const [mutateDelete] = useMutation(deleteFromWantsList);
  const [mutateEdit] = useMutation(editWantsListCard);

  const deleteByOracle = (oracleIds, numberOfCards) => {
    const cardsLabel = numberOfCards > 1 ? 'cards' : 'card';
    message(`Deleted <b>${numberOfCards}</b> ${cardsLabel}!`);

    mutateDelete({
      variables: { oracleIds, wantsListId },
    });
  };

  const onDeleteCard = (cardId) => {
    const { oracle_id } = cards.find(({ id }) => id === cardId);
    deleteByOracle([oracle_id], 1);
  };

  const onEditCard = (cardId, newProps) => {
    mutateEdit({
      variables: { wantsListId, newProps, cardId },
      update: (cache, { data }) => {
        const existing = {};
        if (!deckId) {
          const { wantsList } = cache.readQuery({
            query: wantsListQuery,
            variables: { id: wantsListId },
          });
          existing.wantsList = wantsList;
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

        const newCards = existing.wantsList.cards.map((card) => {
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
      paginated={paginated}
      moveToList={canEdit ? moveToList : undefined}
      onEditCard={canEdit ? onEditCard : undefined}
      onDeleteCard={canEdit ? onDeleteCard : undefined}
      deleteByOracle={canEdit ? deleteByOracle : undefined}
    />
  );
};
