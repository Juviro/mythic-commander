import React from 'react';
import { useMutation } from 'react-apollo';

import { changeWantsListVisibility } from './queries';
import Visibility from './Visibility';

export default ({ visibility, wantsListId }) => {
  const [mutate] = useMutation(changeWantsListVisibility);
  if (!visibility) return null;

  const publicUrl = `${window.location.origin}${window.location.pathname}`;

  const onChange = async (value) => {
    await mutate({ variables: { visibility: value, wantsListId } });
  };

  return (
    <Visibility
      visibility={visibility}
      onChange={onChange}
      title="Share your Wants List"
      description="Your Wants List is visible to:"
      publicUrl={publicUrl}
    />
  );
};
