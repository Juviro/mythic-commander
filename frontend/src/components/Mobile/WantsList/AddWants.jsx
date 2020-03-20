import React from 'react';
import { useMutation } from 'react-apollo';
import { useParams } from 'react-router';
import { addCardsToWantsList, wantsList } from './queries';
import { AddCardMobile } from '../../Elements';
import message from '../../../utils/message';

export default () => {
  const { id: wantsListId } = useParams();
  const [mutate] = useMutation(addCardsToWantsList);

  const onAddCard = (card, name) => {
    message(`Added <b>${name}</b> to your list!`);
    mutate({
      variables: {
        wantsListId,
        cards: [card],
      },
      refetchQueries: ['wantsList'],
      update: (cache, { data }) => {
        if (!data) return;
        const { addCardsToWantsList: newCards } = data;
        const existing = cache.readQuery({
          query: wantsList,
          variables: { id: wantsListId },
        });

        const existingCards = existing.wantsList.cards.filter(
          ({ id }) => !newCards.some(newCard => newCard.id === id)
        );

        cache.writeQuery({
          query: wantsList,
          data: {
            wantsList: {
              ...existing.wantsList,
              cards: existingCards.concat(newCards),
            },
          },
        });
      },
    });
  };
  return (
    <>
      <AddCardMobile onAddCard={onAddCard} />
    </>
  );
};
