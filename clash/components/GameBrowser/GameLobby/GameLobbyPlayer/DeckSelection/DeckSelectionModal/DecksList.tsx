import React from 'react';

import { LobbyDeck } from 'backend/lobby/GameLobby.types';
import { Empty } from 'antd';
import DeckPreview from './DeckPreview';
import DeckStatusTag from './DeckStatusTag';

import styles from './DecksList.module.css';

export interface DecksGroups {
  [key: string]: {
    decks: LobbyDeck[];
    setImg?: string;
  };
}

interface Props {
  deckGroups: DecksGroups;
  onSelect: (deckId: string) => void;
}

const DecksList = ({ deckGroups, onSelect }: Props) => {
  return (
    <div className={styles.decks_wrapper}>
      {Object.entries(deckGroups).map(([status, { decks, setImg }]) => (
        <React.Fragment key={status}>
          <DeckStatusTag status={status} setImg={setImg} />
          <div className={styles.decks}>
            {decks.map((deck) => (
              <DeckPreview key={deck.id} deck={deck} onClick={onSelect} />
            ))}
          </div>
          {!decks.length && <Empty description="No decks found" />}
        </React.Fragment>
      ))}
    </div>
  );
};

export default DecksList;
