import React, { useContext } from 'react';

import SocketContext from '../../../contexts/SocketProvider';
import SOCKET_MSG from '../../../constants/wsEvents';
import { Lobby } from '../../../backend/websocket/GameLobby.types';

interface Props {
  openLobbies: Lobby[];
}

const GameList = ({ openLobbies }: Props) => {
  const { socket } = useContext(SocketContext);

  return (
    <ul>
      {openLobbies.map((lobby) => (
        <li key={lobby.lobbyId}>
          <button
            type="button"
            onClick={() => {
              socket?.emit(SOCKET_MSG.JOIN_LOBBY, lobby);
            }}
          >
            {lobby.name}
          </button>
        </li>
      ))}
    </ul>
  );
};

export default GameList;
