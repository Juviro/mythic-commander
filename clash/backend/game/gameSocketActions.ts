import { Server } from 'socket.io';
import getUser, { User } from 'backend/database/getUser';
import { getGameState } from 'backend/database/matchStore';
import {
  MoveCardPayload,
  SOCKET_MSG_GAME,
  SOCKET_MSG_GENERAL,
} from '../constants/wsEvents';
import Game from './Game';

const gameSocketActions = (io: Server) => {
  const currentGames: { [key: string]: Game } = {};

  io.on('connection', (socket) => {
    let user: User;
    let currentGameId: string;

    socket.on(SOCKET_MSG_GAME.INITIALIZE, async (gameId: string) => {
      try {
        user = await getUser(socket.handshake.headers.cookie);
        socket.emit(SOCKET_MSG_GAME.INITIALIZE, user);
      } catch {
        socket.emit(SOCKET_MSG_GENERAL.NOT_LOGGED_IN);
        return;
      }

      const gameState = await getGameState(gameId);

      const isInGame = gameState?.players.some((player) => player.id === user.id);
      if (!isInGame) {
        socket.emit(SOCKET_MSG_GENERAL.ERROR, 'You are not in this game');
        return;
      }
      currentGameId = gameId;

      if (currentGames[gameId]) {
        currentGames[gameId].join(socket, user);
        return;
      }

      const game = new Game(gameState, io);
      currentGames[gameId] = game;
      game.join(socket, user);
    });

    socket.on(SOCKET_MSG_GAME.DRAW_CARD, () => {
      currentGames[currentGameId].drawCard(socket);
    });

    socket.on(SOCKET_MSG_GAME.MOVE_CARD, (payload: MoveCardPayload) => {
      currentGames[currentGameId].moveCard(socket, payload);
    });

    socket.on(SOCKET_MSG_GAME.SEND_CHAT_MESSAGE, (message: string) => {
      currentGames[currentGameId].sendChatMessage(socket, message);
    });
  });
};

export default gameSocketActions;
