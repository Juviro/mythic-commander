import React from 'react';
import { Tooltip } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';
import classNames from 'classnames';
import Link from 'next/link';

import { LobbyDeck } from 'backend/lobby/GameLobby.types';
import { getDeckImgUrl } from 'utils/getImageUrl';
import ColorIdentity from './ColorIdentity';

import styles from './DecksList.module.css';
import CommanderSelection from './CommanderSelection';

interface Props {
  deck: LobbyDeck;
  condensed?: boolean;
  onClick?: (deckId: string) => void;
  displayCommanderSelection?: boolean;
}

const getDeckUrl = (deck: LobbyDeck) => {
  if ('deckUrl' in deck) {
    return deck.deckUrl as string;
  }

  return `${process.env.NEXT_PUBLIC_MYTHIC_COMMANDER_URL}/decks/${deck.id}`;
};

const DeckPreview = ({ deck, onClick, condensed, displayCommanderSelection }: Props) => {
  return (
    <div
      className={classNames(styles.deck, {
        [styles.deck__condensed]: condensed,
        [styles.deck__clickable]: onClick,
      })}
      onClick={() => onClick?.(deck.id)}
    >
      <div className={styles.img_wrapper}>
        {deck.imgSrc && (
          <img src={getDeckImgUrl(deck.imgSrc)} alt="" className={styles.img} />
        )}
      </div>
      <div className={styles.deck_info}>
        <div className={styles.header}>
          <ColorIdentity colorIdentity={deck.colorIdentity} />
          <Link
            href={getDeckUrl(deck)}
            target="_blank"
            rel="noreferrer noopener"
            className={styles.view_link}
            onClick={(e) => e.stopPropagation()}
          >
            View
            <ArrowRightOutlined />
          </Link>
        </div>
        <Tooltip title={deck.name}>
          <div className={styles.deck_name}>{deck.name}</div>
        </Tooltip>
        {deck.ownerName && (
          <div className={styles.owner_name}>{`by ${deck.ownerName}`}</div>
        )}
        <CommanderSelection
          deck={deck}
          key={deck.id}
          displayCommanderSelection={displayCommanderSelection}
        />
      </div>
    </div>
  );
};

export default DeckPreview;
