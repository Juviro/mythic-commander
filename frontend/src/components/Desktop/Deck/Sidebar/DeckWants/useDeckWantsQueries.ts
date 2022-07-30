import { useMutation } from '@apollo/client';

import {
  editWantsListCardDesktop,
  wantsListDesktop,
} from 'components/Desktop/WantsList/queries';
import { addCardsToWantsList } from 'components/Mobile/Card/queries';
import {
  MutationDeleteFromWantsListArgs,
  WantsList,
  EditWantsListCardInput,
} from 'types/graphql';
import { UnifiedCard, UnifiedWantsList } from 'types/unifiedTypes';
import message from 'utils/message';
import sumCardAmount from 'utils/sumCardAmount';
import { deleteFromWantsList } from './queries';

const useDeckWantsQueries = (wantsList: UnifiedWantsList) => {
  const [mutateDelete] = useMutation<any, MutationDeleteFromWantsListArgs>(
    deleteFromWantsList
  );
  const [mutateEdit] = useMutation(editWantsListCardDesktop);
  const [mutateAdd] = useMutation(addCardsToWantsList);

  const onDeletebyOracle = (oracleIds: string[]) => {
    const newCards = wantsList.originalCards.filter(
      ({ card: { oracle_id } }) => !oracleIds.includes(oracle_id)
    );
    const newNumberOfCards = sumCardAmount(newCards);
    mutateDelete({
      variables: { oracleIds, wantsListId: wantsList.id },
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

  const onEditCard = (cardId: string, newProps: EditWantsListCardInput) => {
    mutateEdit({
      variables: { wantsListId: wantsList.id, newProps, cardId },
      update: (cache, { data }) => {
        const existing = cache.readQuery<{ wantsList: WantsList }>({
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

  const onDeleteCard = (card: UnifiedCard) => {
    const oracleId = card.oracle_id;
    onDeletebyOracle([oracleId]);
  };

  const onAddCard = (card, name) => {
    if (!wantsList) return;

    const usedName = name ?? card.name ?? '';
    const { amount, id } = card;
    mutateAdd({
      variables: {
        cards: [{ id, amount: amount || 1 }],
        wantsListId: wantsList?.id,
      },
      refetchQueries: [
        {
          query: wantsListDesktop,
          variables: { id: wantsList?.id },
        },
      ],
    });
    message(`Added <b>${usedName}</b> cards to <b>${wantsList?.name}</b>!`);
  };

  return { onDeleteCard, onAddCard, onDeletebyOracle, onEditCard };
};

export default useDeckWantsQueries;
