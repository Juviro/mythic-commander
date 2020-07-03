import React from 'react';
import { useMutation } from 'react-apollo';
import { addToCollectionMobile } from './queries';

import { AddCardMobile } from '../../Elements/Mobile';
import message from '../../../utils/message';

export default () => {
  const [mutate] = useMutation(addToCollectionMobile);

  const onAddCard = (newCard, name) => {
    window.scrollTo(0, 0);
    message(`Added <b>${name}</b> to your collection!`);
    mutate({
      variables: { cards: [newCard] },
      refetchQueries: [
        'currentSnapshots',
        'paginatedCollection',
        'ownedCardNames',
      ],
    });
  };

  return <AddCardMobile onAddCard={onAddCard} visible />;
};
