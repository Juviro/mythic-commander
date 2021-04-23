import { useMutation } from 'react-apollo';

import { wantsListDesktop } from 'components/Desktop/WantsList/queries';
import { addCardsToWantsList } from 'components/Mobile/Card/queries';
import { MutationDeleteFromWantsListArgs } from 'types/graphql';
import { UnifiedCard, UnifiedWantsList } from 'types/unifiedTypes';
import message from 'utils/message';
import sumCardAmount from 'utils/sumCardAmount';
import { deleteFromWantsList } from './queries';

const useDeckWantsQueries = (wantsList: UnifiedWantsList) => {
  const [mutateDelete] = useMutation<any, MutationDeleteFromWantsListArgs>(
    deleteFromWantsList
  );
  const [mutateAdd] = useMutation(addCardsToWantsList);

  const onDeleteCard = (card: UnifiedCard) => {
    const newCards = wantsList.originalCards.filter(
      ({ card: { oracle_id } }) => oracle_id !== card.oracle_id
    );
    const newNumberOfCards = sumCardAmount(newCards);
    mutateDelete({
      variables: { oracleIds: [card.oracle_id], wantsListId: wantsList.id },
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

  const onAddCard = (card, name) => {
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
          variables: { id: wantsList.id },
        },
      ],
    });
    message(`Added <b>${usedName}</b> cards to <b>${wantsList?.name}</b>!`);
  };

  return { onDeleteCard, onAddCard };
};

export default useDeckWantsQueries;
