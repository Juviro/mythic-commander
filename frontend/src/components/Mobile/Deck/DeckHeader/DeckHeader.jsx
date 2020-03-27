import React from 'react';

import DeckImage from './DeckImage';
import DeckOverview from './DeckOverview';

export default ({ deck, loading }) => {
  return (
    <>
      <DeckImage imgSrc={deck && deck.imgSrc} loading={loading} />
      <DeckOverview deck={deck} loading={loading} />
    </>
  );
};
