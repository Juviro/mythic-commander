import React from 'react';
import { Tooltip } from 'antd';

import { Deck } from 'backend/lobby/GameLobby.types';
import styles from './DeckLabel.module.css';

// image urls of new decks start with https://mythic-commander.com/, old ones don't
export const getDeckImgSrc = (imgSrc: string) => {
  if (imgSrc.startsWith('https://mythic-commander.com/')) {
    return imgSrc;
  }

  return `https://mythic-commander.com/${imgSrc}`;
};

interface Props {
  deck: Deck;
  deckName?: string;
}

const DeckLabel = ({ deck, deckName }: Props) => {
  const usedName = deckName || deck.name;

  return (
    <Tooltip title={deck.commanderName}>
      <div className={styles.wrapper}>
        {deck?.imgSrc && (
          <img src={getDeckImgSrc(deck.imgSrc)} alt="" className={styles.image} />
        )}
        <div className={styles.deck_name}>
          <span className={styles.label}>{usedName}</span>
          {deck.ownerName && (
            <span className={styles.deck_owner}>{`by ${deck.ownerName}`}</span>
          )}
        </div>
      </div>
    </Tooltip>
  );
};

export default DeckLabel;
