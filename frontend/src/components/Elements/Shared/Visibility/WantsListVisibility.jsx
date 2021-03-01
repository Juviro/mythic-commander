import React from 'react';
import { useMutation } from 'react-apollo';
import { useParams } from 'react-router';

import { changeWantsListVisibility } from './queries';
import Visibility from './Visibility';

export default ({ visibility, asListItem, callback }) => {
  const { id: wantsListId } = useParams();
  const [mutate] = useMutation(changeWantsListVisibility);
  if (!visibility) return null;

  const publicUrl = `${window.location.origin}${window.location.pathname}`.replace(
    '/m/',
    '/'
  );

  const onChange = async (value) => {
    await mutate({ variables: { visibility: value, wantsListId } });
  };

  return (
    <Visibility
      visibility={visibility}
      onChange={onChange}
      callback={callback}
      asListItem={asListItem}
      title="Share your Wants List"
      description="Your Wants List is visible to:"
      publicUrl={publicUrl}
    />
  );
};
