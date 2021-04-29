import React from 'react';
import { getColorIdentity } from 'utils/commander';
import ManaSymbol from '../ManaCost/ManaSymbol';

export default ({ cards, size = 18 }) => {
  const colorIdentity = getColorIdentity(cards);
  return (
    <>
      {colorIdentity.map((symbol) => (
        <ManaSymbol key={symbol} symbol={symbol} size={size} margin="0 2px" />
      ))}
    </>
  );
};
