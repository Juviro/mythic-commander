import React, { useState } from 'react';
import { Input, Tabs } from 'antd';

import useLocalStorage from 'hooks/useLocalStorage';
import { DeckOptions } from '../useDeckSelection';
import DecksList, { DecksGroups } from './DecksList';

import styles from './DeckSelectionModal.module.css';

interface Props extends DeckOptions {
  onSelect: (deckId: string) => void;
}

const DeckSelectionModal = ({ ownDecks, publicDecks, preconDecks, onSelect }: Props) => {
  const [initialTab, setInitialTab] = useLocalStorage<string>(
    'deck-selection-tab',
    'ownDecks'
  );

  const [search, setSearch] = useState('');

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

  const filterDecks = (decksGroup: DecksGroups) => {
    if (!search) {
      return decksGroup;
    }

    return Object.keys(decksGroup).reduce((acc: DecksGroups, key: string) => {
      acc[key].decks = decksGroup[key].decks.filter((deck) => {
        if (key.toLowerCase().includes(search.toLowerCase())) {
          return true;
        }
        const searchableFields = [deck.name, deck.commanderName];
        return searchableFields.some((field) =>
          field?.toLowerCase().includes(search.toLowerCase())
        );
      });

      if (!acc[key].decks.length) {
        delete acc[key];
      }

      return acc;
    }, decksGroup);
  };

  const items = [
    {
      key: 'ownDecks',
      label: 'Your Decks',
      children: (
        <DecksList deckGroups={filterDecks(ownDecksByStatus)} onSelect={onSelect} />
      ),
    },
    {
      key: 'publicDecks',
      label: 'Public Decks',
      children: (
        <DecksList deckGroups={filterDecks(publicDecksGroup)} onSelect={onSelect} />
      ),
    },
    {
      key: 'precons',
      label: 'Precons',
      children: <DecksList deckGroups={filterDecks(preconsBySet)} onSelect={onSelect} />,
    },
  ];

  return (
    <div className={styles.wrapper}>
      <Tabs
        items={items}
        defaultActiveKey={initialTab}
        onChange={(key) => setInitialTab(key)}
      />
      <Input.Search
        placeholder="Search"
        className={styles.search}
        allowClear
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
};

export default DeckSelectionModal;
