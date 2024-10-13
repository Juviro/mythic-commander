import React from 'react';

import { Lobby } from 'backend/lobby/GameLobby.types';
import { getDeckImgUrl } from 'utils/getImageUrl';

import styles from './LastGames.module.css';

interface Props {
  players: Lobby['players'];
}

const LastGamesPlayers = ({ players }: Props) => {
  return (
    <div>
      <ul className={styles.players}>
        {players.map((player) => (
          <li key={player.id} className={styles.player}>
            <img
              src={getDeckImgUrl(player.deck!.imgSrc!)}
              alt=""
              className={styles.player_image}
            />
            <span className={styles.player_name} style={{ background: player.color! }}>
              {player.username}
            </span>
            {player.deck?.name && (
              <span className={styles.player_deck}>{`(${player.deck?.name})`}</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LastGamesPlayers;
