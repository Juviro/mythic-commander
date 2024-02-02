import { Server } from 'socket.io';
import getUser, { User } from 'backend/database/getUser';
import { getGameState } from 'backend/database/matchStore';
import {
  AddCountersPayload,
  DiscardRandomCardPayload,
  EndPeekPayload,
  FlipCardsPayload,
  MillPayload,
  MoveCardPayload,
  MoveCardsGroupPayload,
  PeekPayload,
  SOCKET_MSG_GAME,
  SOCKET_MSG_GENERAL,
  SearchLibraryPayload,
  SendMessagePayload,
  SetCommanderTimesCastedPayload,
  SetPhasePayload,
  SetPlayerLifePayload,
  TapCardsPayload,
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

      const { gameState } = await getGameState(gameId);

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

    socket.on(SOCKET_MSG_GAME.RESTART_GAME, () => {
      currentGames[currentGameId].restartGame(socket);
    });

    socket.on(SOCKET_MSG_GAME.DRAW_CARD, () => {
      currentGames[currentGameId].drawCard(socket);
    });

    socket.on(SOCKET_MSG_GAME.MOVE_CARD, (payload: MoveCardPayload) => {
      currentGames[currentGameId].moveCard(socket, payload);
    });

    socket.on(SOCKET_MSG_GAME.MOVE_CARDS_GROUP, (payload: MoveCardsGroupPayload) => {
      currentGames[currentGameId].moveCardGroup(payload);
    });

    socket.on(
      SOCKET_MSG_GAME.DISCARD_RANDOM_CARD,
      (payload: DiscardRandomCardPayload) => {
        currentGames[currentGameId].discardRandomCard(payload);
      }
    );

    socket.on(SOCKET_MSG_GAME.ADD_COUNTER, (payload: AddCountersPayload) => {
      currentGames[currentGameId].addCounters(socket, payload);
    });

    socket.on(SOCKET_MSG_GAME.TAP_CARDS, (payload: TapCardsPayload) => {
      currentGames[currentGameId].tapCards(payload);
    });

    socket.on(SOCKET_MSG_GAME.FLIP_CARDS, (payload: FlipCardsPayload) => {
      currentGames[currentGameId].flipCards(payload);
    });

    socket.on(SOCKET_MSG_GAME.MILL, (payload: MillPayload) => {
      currentGames[currentGameId].mill(socket, payload);
    });

    socket.on(SOCKET_MSG_GAME.PEEK, (payload: PeekPayload) => {
      currentGames[currentGameId].peek(socket, payload);
    });

    socket.on(SOCKET_MSG_GAME.END_PEEK, (payload: EndPeekPayload) => {
      currentGames[currentGameId].endPeek(socket, payload);
    });

    socket.on(SOCKET_MSG_GAME.SEARCH_LIBRARY, (payload: SearchLibraryPayload) => {
      currentGames[currentGameId].searchLibrary(socket, payload);
    });

    socket.on(SOCKET_MSG_GAME.SHUFFLE_LIBRARY, () => {
      currentGames[currentGameId].shuffleLibrary(socket);
    });

    socket.on(SOCKET_MSG_GAME.SEND_CHAT_MESSAGE, (message: SendMessagePayload) => {
      currentGames[currentGameId].sendChatMessage(socket, message);
    });

    socket.on(
      SOCKET_MSG_GAME.SET_COMMANDER_TIMES_CASTED,
      (payload: SetCommanderTimesCastedPayload) => {
        currentGames[currentGameId].setCommanderTimesCasted(socket, payload);
      }
    );

    socket.on(SOCKET_MSG_GAME.SET_PLAYER_LIFE, (payload: SetPlayerLifePayload) => {
      currentGames[currentGameId].setPlayerLife(socket, payload);
    });

    socket.on(SOCKET_MSG_GAME.END_TURN, () => {
      currentGames[currentGameId].endTurn(socket);
    });

    socket.on(SOCKET_MSG_GAME.SET_PHASE, (payload: SetPhasePayload) => {
      currentGames[currentGameId].setPhase(socket, payload);
    });
  });
};

export default gameSocketActions;
