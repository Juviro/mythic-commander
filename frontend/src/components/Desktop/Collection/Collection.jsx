import React from 'react';
import { useQuery } from '@apollo/react-hooks';

import { getCollectionDesktop as getCollection } from './queries';
import unifyCardFormat from '../../../utils/unifyCardFormat';
import Cards from './Cards';

export default () => {
  const { data, loading } = useQuery(getCollection);
  console.log('data, loading :', data, loading);
  const cards = data && unifyCardFormat(data.collection.cards);
  return (
    <>
      <Cards cards={cards} loading={loading} />
    </>
  );
};
