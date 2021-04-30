import React from 'react';

import MultiInput from 'components/Elements/Desktop/AddCards/MultIinput';
import { Space } from 'antd';
import AddDeckCardsTo from './AddDeckCardsTo';
import {
  ProxyCards,
  ExportAsText,
  Menu,
  DeckVisibility,
} from '../../../../Elements/Shared';
import DuplicateDeck from '../../../../Mobile/Deck/EditDeck/DuplicateDeck';
import DeleteDeck from '../../../../Mobile/Deck/EditDeck/DeleteDeck';

export default ({ deck, onAddCards }) => {
  if (!deck) return null;

  const actions = [
    <ExportAsText cards={deck.cards} title={deck.name} />,
    <ProxyCards id={deck.id} type="deck" />,
    <AddDeckCardsTo cards={deck.cards} />,
    <DuplicateDeck />,
    <MultiInput onAddCards={onAddCards} buttonProps={{ type: 'link' }} />,
    <DeleteDeck />,
  ];

  return (
    <Space>
      {deck.canEdit && <DeckVisibility visibility={deck.visibility} />}
      <Menu actions={actions} placement="bottomRight" />
    </Space>
  );
};
