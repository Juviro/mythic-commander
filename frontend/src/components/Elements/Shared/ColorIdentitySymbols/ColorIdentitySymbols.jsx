import React from 'react';
import ManaSymbol from '../ManaCost/ManaSymbol';

export default ({ cards, size = 18 }) => {
  const commander = cards.filter(({ isCommander }) => isCommander);
  const colorIdentity = commander.reduce(
    (acc, { color_identity }) => [...new Set(acc.concat(color_identity))],
    []
  );
  return (
    <>
      {colorIdentity.map(symbol => (
        <ManaSymbol key={symbol} symbol={symbol} size={size} margin="0 2px" />
      ))}
    </>
  );
};
