import UserContext from 'components/Provider/UserProvider';
import React, { useContext } from 'react';
import { useMutation, useQuery } from '@apollo/client';

import { changeCollectionVisibility, collectionVisibility } from './queries';
import Visibility from './Visibility';

export default () => {
  const [mutate] = useMutation(changeCollectionVisibility);
  const { data: dataVisibility, loading } = useQuery(collectionVisibility);

  const { user } = useContext(UserContext);

  const publicUrl = `${window.location.origin}/collection/${user?.username}`;

  const onChange = async (value) => {
    await mutate({ variables: { visibility: value } });
  };

  return (
    <Visibility
      visibility={dataVisibility?.collection?.visibility}
      loading={loading}
      onChange={onChange}
      publicUrl={publicUrl}
      hidePublic
      title="Share your collection"
      description="Your collection is visible to:"
    />
  );
};
