import React from 'react';
import { useMutation } from 'react-apollo';

import { AddCards } from '../../../Elements/Desktop';
import message from '../../../../utils/message';
import { addToCollectionDesktop } from './queries';

export default () => {
  const [mutate] = useMutation(addToCollectionDesktop);

  const onAddCards = (cards, name) => {
    const addedName = name || `${cards.length} cards`;
    message(`Added <b>${addedName}</b> to your collection!`);
    mutate({
      variables: { cards },
      refetchQueries: [
        'currentSnapshots',
        'paginatedCollection',
        'ownedCardNames',
      ],
    });
  };

  return <AddCards onAddCards={onAddCards} autoFocus={false} />;
};
