import React from 'react';
import ManaSymbol from './ManaSymbol';
import Flex from '../Flex';

const ManaCost = ({ costString, size }) => {
  if (!costString) return '';
  const costs = costString.match(/[\w/]+/g);
  if (!costs) return '';

  return (
    <Flex direction="row" align="center" justify="center">
      {costs.map((cost, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <ManaSymbol symbol={cost} key={cost + index} size={size} />
      ))}
    </Flex>
  );
};

export default React.memo(ManaCost);
