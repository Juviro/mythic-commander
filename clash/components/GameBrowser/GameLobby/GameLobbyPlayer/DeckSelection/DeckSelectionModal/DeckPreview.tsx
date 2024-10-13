import React from 'react';
import { Tooltip } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';
import classNames from 'classnames';
import Link from 'next/link';

import { LobbyDeck } from 'backend/lobby/GameLobby.types';
import { getDeckImgUrl } from 'utils/getImageUrl';
import ColorIdentity from './ColorIdentity';

import styles from './DecksList.module.css';

interface Props {
  deck: LobbyDeck;
  condensed?: boolean;
  onClick?: (deckId: string) => void;
}

const getDeckUrl = (deckId: string) =>
  `${process.env.NEXT_PUBLIC_MYTHIC_COMMANDER_URL}/decks/${deckId}`;

const DeckPreview = ({ deck, onClick, condensed }: Props) => {
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
            href={getDeckUrl(deck.id)}
            target="_blank"
            rel="noreferrer noopener"
            className={styles.view_link}
            onClick={(e) => e.stopPropagation()}
          >
            View
            <ArrowRightOutlined />
          </Link>
        </div>
        <div className={styles.deck_name}>{deck.name}</div>
        <Tooltip title={deck.commanderName}>
          <div className={styles.commander_names}>
            {deck.commanderName?.split('& ').map((commander) => (
              <div key={commander} className={styles.commander_name}>
                {commander}
              </div>
            ))}
          </div>
        </Tooltip>
        {deck.ownerName && (
          <div className={styles.owner_name}>{`by ${deck.ownerName}`}</div>
        )}
      </div>
    </div>
  );
};

export default DeckPreview;
