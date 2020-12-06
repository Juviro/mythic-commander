import React from 'react';
import { useMutation } from 'react-apollo';

import {
  WithFullList,
  PaginatedCardList,
  WithActions,
  PageCard,
} from '../../Elements/Desktop';
import message from '../../../utils/message';
import {
  deleteFromWantsListDesktop,
  editWantsListCardDesktop,
  wantsListDesktop,
} from './queries';

export default ({ cards, loading, wantsList }) => {
  const [mutateDelete] = useMutation(deleteFromWantsListDesktop);
  const [mutateEdit] = useMutation(editWantsListCardDesktop);

  const deleteByOracle = (oracleIds, numberOfCards) => {
    const cardsLabel = numberOfCards > 1 ? 'cards' : 'card';
    message(`Deleted <b>${numberOfCards}</b> ${cardsLabel} from ${wantsList.name}!`);
    mutateDelete({
      variables: { oracleIds, wantsListId: wantsList.id },
    });
  };

  const onEditCard = (cardId, newProps) => {
    mutateEdit({
      variables: { wantsListId: wantsList.id, newProps, cardId },
      update: (cache, { data }) => {
        const existing = cache.readQuery({
          query: wantsListDesktop,
          variables: { id: wantsList.id },
        });
        const { editWantsListCard: newCard } = data;

        const newCards = existing.wantsList.cards.map((card) => {
          if (card.card.id !== cardId) return card;
          return newCard;
        });

        cache.writeQuery({
          query: wantsListDesktop,
          variables: { id: wantsList.id },
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
    <PageCard style={{ height: 'auto' }}>
      <WithActions deleteByOracle={deleteByOracle} onEditCard={onEditCard}>
        {(actionProps) => (
          <WithFullList cards={cards} {...actionProps}>
            {(fullListProps) => (
              <PaginatedCardList
                {...fullListProps}
                loading={loading}
                showAddedBeforeFilter
                showCollectionFilters
                orderByParamName="orderByAdvanced"
              />
            )}
          </WithFullList>
        )}
      </WithActions>
    </PageCard>
  );
};
