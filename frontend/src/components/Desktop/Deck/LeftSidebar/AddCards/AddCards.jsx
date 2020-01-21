import React from 'react';
import { useMutation } from 'react-apollo';
import { useParams } from 'react-router';

import AddCards from '../../../../Elements/AddCards';
import { addCardsToDeck } from '../../../../../queries/deck';

export default () => {
  const { id: deckId } = useParams();
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
