import React from 'react';
import { useParams } from 'react-router';

import { PageCategory, PageLayout } from 'components/Elements/Desktop';
import AddToCollection from 'components/Desktop/Collection/AddToCollection';
import Cards from './Cards';
import CollectionOverview from './CollectionOverview';

export default () => {
  const { username } = useParams();

  return (
    <PageLayout>
      {!username && <CollectionOverview />}
      {!username && <AddToCollection />}
      <PageCategory title="Your Cards" style={{ height: 'auto' }}>
        <Cards />
      </PageCategory>
    </PageLayout>
  );
};
