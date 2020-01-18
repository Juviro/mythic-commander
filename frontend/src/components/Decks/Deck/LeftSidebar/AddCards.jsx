import React from 'react';
import { useMutation } from 'react-apollo';
import AddCards from '../../../Elements/AddCards';
import { addCardsToDeck } from '../../../../queries/deck';

export default ({ deckId }) => {
  const [mutate] = useMutation(addCardsToDeck);

  const onAddCards = cards => {
    mutate({
      variables: {
        deckId,
        cards,
      },
    });
  };
  return <AddCards onAddCards={onAddCards} />;
};
