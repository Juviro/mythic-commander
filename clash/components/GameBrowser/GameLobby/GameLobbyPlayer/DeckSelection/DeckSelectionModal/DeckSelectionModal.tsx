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

  const preconsByRelease = preconDecks.reduce((acc: DecksGroups, currentDeck) => {
    const currentRelease = acc[currentDeck.releaseName] || [];
    return {
      ...acc,
      [currentDeck.releaseName]: [...currentRelease, currentDeck],
    };
  }, {});

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
      children: <DecksList deckGroups={preconsByRelease} onSelect={onSelect} />,
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
