import React, { useContext } from 'react';
import { useParams } from 'react-router';

import { PageLayout } from 'components/Elements/Desktop';
import AddToCollection from 'components/Desktop/Collection/AddToCollection';
import UserContext from 'components/Provider/UserProvider';
import { LoginRequired } from 'components/Elements/Shared';
import Cards from './Cards';
import CollectionOverview from './CollectionOverview';

export default () => {
  const { username } = useParams();
  const { user, loading } = useContext(UserContext);

  if (!username && !user && !loading) {
    return <LoginRequired message="Login to create your own collection" />;
  }

  return (
    <PageLayout>
      {!username && <CollectionOverview />}
      {!username && <AddToCollection />}
      <Cards />
    </PageLayout>
  );
};
