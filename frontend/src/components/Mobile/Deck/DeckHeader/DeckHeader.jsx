import React from 'react';

import DeckImage from './DeckImage';
import DeckStats from './DeckStats';

export default ({ deck }) => {
  return (
    <>
      <DeckImage imgSrc={deck.imgSrc} />
      <DeckStats deck={deck} />
    </>
  );
};
