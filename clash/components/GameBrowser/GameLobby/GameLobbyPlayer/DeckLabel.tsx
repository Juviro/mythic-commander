import React from 'react';
import { Tooltip } from 'antd';
import { Deck } from '../../../../backend/websocket/GameLobby.types';

import styles from './DeckLabel.module.css';

// image urls of new decks start with https://mythic-commander.com/, old ones don't
const getImgSrc = (imgSrc: string) => {
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
      <img src={getImgSrc(deck.imgSrc)} alt="" className={styles.image} />
      <Tooltip title={usedName} open={displayTooltip ? undefined : false}>
        <span className={styles.label}>{usedName}</span>
      </Tooltip>
    </div>
  );
};

export default DeckLabel;
