import React from 'react';
import LazyLoadCard from '../../Elements/LazyLoadCard/LazyLoadCard';

export default ({ card, loading }) => {
  return (
    <>
      <LazyLoadCard card={card} />
    </>
  );
};
