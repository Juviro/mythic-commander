import React from 'react';
import { useParams } from 'react-router';

import { PageLayout } from 'components/Elements/Desktop';
import AddToCollection from 'components/Desktop/Collection/AddToCollection';
import Cards from './Cards';
import CollectionOverview from './CollectionOverview';

export default () => {
  const { username } = useParams();

  return (
    <PageLayout>
      {!username && <CollectionOverview />}
      {!username && <AddToCollection />}
      <Cards />
    </PageLayout>
  );
};
