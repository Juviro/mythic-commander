import React from 'react';

import AddDeckCardsTo from './AddDeckCardsTo';
import { ProxyCards, ExportAsText, Menu } from '../../../../Elements/Shared';
import DuplicateDeck from '../../../../Mobile/Deck/EditDeck/DuplicateDeck';
import DeleteDeck from '../../../../Mobile/Deck/EditDeck/DeleteDeck';

export default ({ deck }) => {
  if (!deck) return null;

  const actions = [
    <ExportAsText cards={deck.cards} title={deck.name} />,
    <ProxyCards id={deck.id} type="deck" />,
    <AddDeckCardsTo cards={deck.cards} />,
    <DuplicateDeck />,
    <DeleteDeck />,
  ];

  return <Menu actions={actions} placement="bottomRight" />;
};
