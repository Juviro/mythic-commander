import React from 'react';
import { Tabs } from 'antd';

import useLocalStorage from 'hooks/useLocalStorage';
import { DeckOptions } from '../useDeckSelection';
import DecksList, { DecksGroups } from './DecksList';

interface Props extends DeckOptions {
  onSelect: (deckId: string) => void;
}

const DeckSelectionModal = ({ ownDecks, publicDecks, onSelect }: Props) => {
  const [initialTab, setInitialTab] = useLocalStorage<string>(
    'deck-selection-tab',
    'ownDecks'
  );

  const ownDecksByStatus = ownDecks.reduce(
    (acc: DecksGroups, currentDeck) => ({
      ...acc,
      [currentDeck.status]: [...acc[currentDeck.status], currentDeck],
    }),
    {
      active: [],
      draft: [],
      archived: [],
    }
  );

  const publicDecksGroup = {
    decks: publicDecks,
  };

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
