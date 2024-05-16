import React from 'react';

import { Lobby } from 'backend/lobby/GameLobby.types';
import HostGame from '../HostGame/HostGame';

import styles from './GameSelection.module.css';
import GamesList from './GamesList';

interface Props {
  openLobbies?: Lobby[];
  onJoinLobby: (id: string) => void;
}

const OpenGamesList = ({ openLobbies, onJoinLobby }: Props) => {
  const games = openLobbies
    ?.filter(({ gameLoading }) => !gameLoading)
    .map(({ id, name, players, maxNumberOfPlayers }) => ({
      id,
      name,
      description: `${players.length} / ${maxNumberOfPlayers}`,
    }));

  return (
    <div className={styles.open_games}>
      <GamesList games={games} onJoinGame={onJoinLobby} emptyText="No open lobbies" />
      <HostGame />
    </div>
  );
};

export default OpenGamesList;
