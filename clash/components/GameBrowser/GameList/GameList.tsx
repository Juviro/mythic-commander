import React, { useContext } from 'react';

import SocketContext from '../../../contexts/SocketProvider';
import SOCKET_MSG from '../../../constants/wsEvents';
import { Lobby } from '../../../backend/websocket/GameLobby.types';

import styles from './GameList.module.css';

interface Props {
  openLobbies: Lobby[];
}

const GameList = ({ openLobbies }: Props) => {
  const { socket } = useContext(SocketContext);

  return (
    <ul className={styles.list}>
      {openLobbies.map((lobby) => (
        <li key={lobby.lobbyId} className={styles.list_item}>
          <button
            type="button"
            onClick={() => {
              socket?.emit(SOCKET_MSG.JOIN_LOBBY, lobby);
            }}
            className={styles.list_button}
          >
            <span>{lobby.name}</span>
            <span>{`${lobby.players.length} / ${lobby.numberOfPlayers}`}</span>
          </button>
        </li>
      ))}
    </ul>
  );
};

export default GameList;
