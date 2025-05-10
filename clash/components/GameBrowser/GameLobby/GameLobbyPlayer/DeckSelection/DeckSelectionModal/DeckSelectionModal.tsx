import React from 'react';
import { Tabs } from 'antd';

import useLocalStorage from 'hooks/useLocalStorage';
import { DeckOptions } from '../useDeckSelection';
import DecksList, { DecksGroups } from './DecksList';

interface Props extends DeckOptions {
  onSelect: (deckId: string) => void;
}

const DeckSelectionModal = ({ ownDecks, publicDecks, preconDecks, onSelect }: Props) => {
  const [initialTab, setInitialTab] = useLocalStorage<string>(
    'deck-selection-tab',
    'ownDecks'
  );

  const ownDecksByStatus: DecksGroups = {
    active: { decks: [] },
    draft: { decks: [] },
    archived: { decks: [] },
  };

  ownDecks.forEach((deck) => {
    if (ownDecksByStatus[deck.status]) {
      ownDecksByStatus[deck.status].decks.push(deck);
    }
  });

  const publicDecksGroup: DecksGroups = {
    all: { decks: publicDecks },
  };

  const preconsBySet: DecksGroups = {};
  preconDecks.forEach((deck) => {
    if (!preconsBySet[deck.setName]) {
      preconsBySet[deck.setName] = { decks: [], setImg: deck.setImg };
    }
    preconsBySet[deck.setName].decks.push(deck);
  });

  const items = [
    {
      key: 'ownDecks',
      label: 'Your Decks',
      children: <DecksList deckGroups={ownDecksByStatus} onSelect={onSelect} />,
    },
    {
      key: 'publicDecks',
      label: 'Public Decks',
      children: <DecksList deckGroups={publicDecksGroup} onSelect={onSelect} />,
    },
    {
      key: 'precons',
      label: 'Precons',
      children: <DecksList deckGroups={preconsBySet} onSelect={onSelect} />,
    },
  ];

  return (
    <Tabs
      items={items}
      defaultActiveKey={initialTab}
      onChange={(key) => setInitialTab(key)}
    />
  );
};

export default DeckSelectionModal;
