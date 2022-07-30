import { useMutation } from '@apollo/client';

import message from 'utils/message';
import { wantsListDesktop } from 'components/Desktop/WantsList/queries';
import { addCardsToWantsList } from 'components/Mobile/Card/queries';

const useDeckWantsQueries = () => {
  const [mutateAdd] = useMutation(addCardsToWantsList);
  const onAddCard = (wantsListId: string, wantsListName: string) => (card) => {
    const { amount, id } = card;
    mutateAdd({
      variables: {
        cards: [{ id, amount: amount || 1 }],
        wantsListId,
      },
      refetchQueries: [
        {
          query: wantsListDesktop,
          variables: { id: wantsListId },
        },
      ],
    });
    message(`Added <b>${card.name}</b> cards to <b>${wantsListName}</b>!`);
  };

  return { onAddCard };
};

export default useDeckWantsQueries;
