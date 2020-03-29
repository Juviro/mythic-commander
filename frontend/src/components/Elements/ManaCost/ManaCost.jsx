import React from 'react';
import ManaSymbol from './ManaSymbol';

export default ({ costString }) => {
  if (!costString) return '-';
  const costs = costString.match(/[\w/]+/g);
  if (!costs) return '-';
  return (
    <>
      {costs.map((cost, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <ManaSymbol symbol={cost} key={cost + index} />
      ))}
    </>
  );
};
