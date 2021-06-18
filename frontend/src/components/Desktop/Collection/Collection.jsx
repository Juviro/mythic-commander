import React, { useContext } from 'react';
import { useParams } from 'react-router';

import { PageLayout } from 'components/Elements/Desktop';
import AddToCollection from 'components/Desktop/Collection/AddToCollection';
import UserContext from 'components/Provider/UserProvider';
import { LoginRequired } from 'components/Elements/Shared/LoginRequired/LoginRequired';
import useDocumentTitle from 'components/Hooks/useDocumentTitle';
import Cards from './Cards';
import CollectionOverview from './CollectionOverview';

export default () => {
  const { username } = useParams();
  const { user, loading } = useContext(UserContext);

  const documentTitle = username ? `${username}'s Collection` : 'Collection';
  useDocumentTitle(documentTitle);

  if (!username && !user && !loading) {
    return <LoginRequired message="Log in to create your own collection" />;
  }

  return (
    <PageLayout>
      {!username && <CollectionOverview />}
      {!username && <AddToCollection />}
      <Cards />
    </PageLayout>
  );
};
