import { Server } from 'socket.io';
import getUser, { User } from 'backend/database/getUser';
import { getGameState } from 'backend/database/matchStore';
import {
  AcceptHandPayload,
  AddCountersPayload,
  CopyCardPayload,
  CreateTokenPayload,
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
  TurnCardsFaceDownPayload,
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
      currentGames[currentGameId].restartGame(user.id);
    });

    socket.on(SOCKET_MSG_GAME.ACCEPT_HAND, (payload: AcceptHandPayload) => {
      currentGames[currentGameId].acceptHand(user.id, payload);
    });

    socket.on(SOCKET_MSG_GAME.TAKE_MULLIGAN, () => {
      currentGames[currentGameId].takeMulligan(user.id);
    });

    socket.on(SOCKET_MSG_GAME.DRAW_CARD, () => {
      currentGames[currentGameId].drawCard(user.id);
    });

    socket.on(SOCKET_MSG_GAME.MOVE_CARD, (payload: MoveCardPayload) => {
      currentGames[currentGameId].moveCard(user.id, payload);
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
      currentGames[currentGameId].addCounters(payload);
    });

    socket.on(SOCKET_MSG_GAME.CREATE_TOKEN, (payload: CreateTokenPayload) => {
      currentGames[currentGameId].createToken(payload);
    });

    socket.on(SOCKET_MSG_GAME.COPY_CARD, (payload: CopyCardPayload) => {
      currentGames[currentGameId].copyCard(payload);
    });

    socket.on(SOCKET_MSG_GAME.TAP_CARDS, (payload: TapCardsPayload) => {
      currentGames[currentGameId].tapCards(payload);
    });

    socket.on(SOCKET_MSG_GAME.FLIP_CARDS, (payload: FlipCardsPayload) => {
      currentGames[currentGameId].flipCards(payload);
    });

    socket.on(SOCKET_MSG_GAME.TURN_FACE_DOWN, (payload: TurnCardsFaceDownPayload) => {
      currentGames[currentGameId].turnCardsFaceDown(payload);
    });

    socket.on(SOCKET_MSG_GAME.MILL, (payload: MillPayload) => {
      currentGames[currentGameId].mill(user.id, payload);
    });

    socket.on(SOCKET_MSG_GAME.PEEK, (payload: PeekPayload) => {
      currentGames[currentGameId].peek(user.id, payload);
    });

    socket.on(SOCKET_MSG_GAME.END_PEEK, (payload: EndPeekPayload) => {
      currentGames[currentGameId].endPeek(user.id, payload);
    });

    socket.on(SOCKET_MSG_GAME.SEARCH_LIBRARY, (payload: SearchLibraryPayload) => {
      currentGames[currentGameId].searchLibrary(user.id, payload);
    });

    socket.on(SOCKET_MSG_GAME.SHUFFLE_LIBRARY, () => {
      currentGames[currentGameId].shuffleLibrary(user.id);
    });

    socket.on(SOCKET_MSG_GAME.SEND_CHAT_MESSAGE, (message: SendMessagePayload) => {
      currentGames[currentGameId].sendChatMessage(user.id, message);
    });

    socket.on(
      SOCKET_MSG_GAME.SET_COMMANDER_TIMES_CASTED,
      (payload: SetCommanderTimesCastedPayload) => {
        currentGames[currentGameId].setCommanderTimesCasted(user.id, payload);
      }
    );

    socket.on(SOCKET_MSG_GAME.SET_PLAYER_LIFE, (payload: SetPlayerLifePayload) => {
      currentGames[currentGameId].setPlayerLife(user.id, payload);
    });

    socket.on(SOCKET_MSG_GAME.END_TURN, () => {
      currentGames[currentGameId].endTurn(user.id);
    });

    socket.on(SOCKET_MSG_GAME.SET_PHASE, (payload: SetPhasePayload) => {
      currentGames[currentGameId].setPhase(user.id, payload);
    });

    socket.on('disconnect', () => {
      if (!currentGames[currentGameId]) return;
      currentGames[currentGameId].storeGameState();
    });
  });
};

export default gameSocketActions;
