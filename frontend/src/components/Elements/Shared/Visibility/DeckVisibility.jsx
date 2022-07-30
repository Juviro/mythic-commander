import React from 'react';
import { useMutation } from '@apollo/client';
import { useParams } from 'react-router';

import { changeDeckVisibility } from './queries';
import Visibility from './Visibility';

export default ({ visibility, asListItem, callback }) => {
  const { id: deckId } = useParams();
  const [mutate] = useMutation(changeDeckVisibility);
  if (!visibility) return null;

  const publicUrl = `${window.location.origin}${window.location.pathname}`.replace(
    '/m/',
    '/'
  );

  const onChange = async (value) => {
    await mutate({
      variables: { visibility: value, deckId },
      optimisticResponse: () => ({
        __typename: 'Mutation',
        changeDeckVisibility: {
          __typename: 'Deck',
          id: deckId,
          visibility: value,
        },
      }),
    });
  };

  return (
    <Visibility
      visibility={visibility}
      onChange={onChange}
      callback={callback}
      asListItem={asListItem}
      title="Share your Deck"
      description="Your Deck is visible to:"
      publicUrl={publicUrl}
    />
  );
};
