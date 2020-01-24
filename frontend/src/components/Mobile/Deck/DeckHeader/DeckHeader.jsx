import React from 'react';

import DeckImage from './DeckImage';
import DeckOverview from './DeckOverview';

export default ({ deck }) => {
  return (
    <>
      <DeckImage imgSrc={deck.imgSrc} />
      <DeckOverview deck={deck} />
    </>
  );
};
