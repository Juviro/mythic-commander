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
  displayTooltip?: boolean;
  deckName?: string;
}

const DeckLabel = ({ deck, displayTooltip, deckName }: Props) => {
  const usedName = deckName || deck.name;

  return (
    <div className={styles.wrapper}>
      <img src={getDeckImgSrc(deck.imgSrc)} alt="" className={styles.image} />
      <div className={styles.deck_name}>
        <Tooltip title={usedName} open={displayTooltip ? undefined : false}>
          <span className={styles.label}>{usedName}</span>
        </Tooltip>
        {deck.ownerName && (
          <span className={styles.deck_owner}>{`by ${deck.ownerName}`}</span>
        )}
      </div>
    </div>
  );
};

export default DeckLabel;
