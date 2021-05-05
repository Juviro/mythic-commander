import React from 'react';
import { useMutation } from 'react-apollo';
import { useParams } from 'react-router';
import { addToCollectionMobile } from './queries';

import { AddCardMobile } from '../../Elements/Mobile';
import message from '../../../utils/message';

export default () => {
  const { username } = useParams();
  const [mutate] = useMutation(addToCollectionMobile);

  const onAddCard = (newCard, name) => {
    window.scrollTo(0, 0);
    message(`Added <b>${name}</b> to your collection!`);
    mutate({
      variables: { cards: [newCard] },
      refetchQueries: ['currentSnapshots', 'paginatedCollection'],
    });
  };

  if (username) return null;

  return <AddCardMobile onAddCard={onAddCard} visible allowFoilInput />;
};
