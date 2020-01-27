import React from 'react';
import { useQuery } from '@apollo/react-hooks';

import { getCollection } from '../../../queries';

import ListView from './ListView';
import Header from './Header';

export default () => {
  const { data, loading } = useQuery(getCollection);
  const cards = data ? data.collection.cards : [];

  const totalValue = cards.reduce((acc, val) => acc + val.priceInEuro, 0);
  console.log('totalValue :', totalValue);

  return (
    <>
      <Header />
      <ListView cards={cards} loading={loading} />
    </>
  );
};
