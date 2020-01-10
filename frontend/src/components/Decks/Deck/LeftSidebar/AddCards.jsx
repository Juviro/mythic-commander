import React from 'react';
import { useMutation } from 'react-apollo';
import AddCards from '../../../Elements/AddCards';
import { addCardsToDeck, addToDeckHelper } from '../../../../queries/deck';

export default ({ deckId }) => {
  const [mutate] = useMutation(addCardsToDeck);

  const onAddCards = cards => {
    mutate({
      variables: {
        deckId,
        cards,
      },
      optimisticResponse: addToDeckHelper.optimisticResponse(cards, deckId),
      update: addToDeckHelper.update,
    });
  };
  return <AddCards onAddCards={onAddCards} />;
};
