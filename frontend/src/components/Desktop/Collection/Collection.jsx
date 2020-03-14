import React from 'react';
import { useQuery } from '@apollo/react-hooks';

import { getCollectionDesktop as getCollection } from './queries';

import ListView from './ListView';
import Header from './Header';

export default () => {
  const { data, loading } = useQuery(getCollection);
  const cards = data ? data.collection.cards : [];

  return (
    <>
      <Header />
      <ListView cards={cards} loading={loading} />
    </>
  );
};
