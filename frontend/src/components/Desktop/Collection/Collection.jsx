import React from 'react';
import { useParams } from 'react-router';

import { PageLayout } from 'components/Elements/Desktop';
import AddToCollection from 'components/Desktop/Collection/AddToCollection';
import Cards from './Cards';
import CollectionOverview from './CollectionOverview';
import CollectionCard from './CollectionCard';

export default () => {
  const { username } = useParams();

  return (
    <PageLayout>
      {!username && <CollectionOverview />}
      {!username && <AddToCollection />}
      <CollectionCard title="Your Cards" style={{ height: 'auto' }}>
        <Cards />
      </CollectionCard>
    </PageLayout>
  );
};
