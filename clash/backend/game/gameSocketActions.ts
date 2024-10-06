import { Server } from 'socket.io';
import uniqid from 'uniqid';

import getUser, { User } from 'backend/database/getUser';
import { getGameState } from 'backend/database/matchStore';
import getPlaytestGamestate from 'backend/lobby/initMatch/getPlaytestGamestate';
import {
  AcceptHandPayload,
  AddCountersPayload,
  ChatCommandPayload,
  CopyCardPayload,
  CreateTokenPayload,
  DiscardRandomCardPayload,
  EndPeekPayload,
  FlipCardsPayload,
  MillPayload,
  MoveCardPayload,
  MoveCardsGroupPayload,
  PeekFaceDownPayload,
  PeekPayload,
  PlayTopCardFaceDownPayload,
  RevealPayload,
  RotateCardsPayload,
  SOCKET_MSG_GAME,
  SOCKET_MSG_GENERAL,
  SearchLibraryPayload,
  SendMessagePayload,
  SetCommanderDamagePayload,
  SetCommanderTimesCastedPayload,
  SetPhasePayload,
  SetPlayerLifePayload,
  SetStopPointPayload,
  TapCardsPayload,
  ToggleStackOpenPayload,
  TrackFloatingManaPayload,
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

    socket.on(SOCKET_MSG_GAME.INITIALIZE_PLAYTEST, async (deckId: string) => {
      try {
        user = await getUser(socket.handshake.headers.cookie);
        socket.emit(SOCKET_MSG_GAME.INITIALIZE_PLAYTEST, user);
      } catch {
        socket.emit(SOCKET_MSG_GENERAL.NOT_LOGGED_IN);
        return;
      }

      currentGameId = uniqid();

      const gameState = await getPlaytestGamestate(currentGameId, user, deckId);

      const game = new Game(gameState, io, true, deckId);
      currentGames[currentGameId] = game;
      game.join(socket, user);
    });

    socket.on(SOCKET_MSG_GAME.RESTART_GAME, () => {
      currentGames[currentGameId].restartGame(user.id);
    });

    socket.on(SOCKET_MSG_GAME.RESIGN_GAME, () => {
      currentGames[currentGameId].resign(user.id);
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
      currentGames[currentGameId].addCounters(user.id, payload);
    });

    socket.on(SOCKET_MSG_GAME.CREATE_TOKEN, (payload: CreateTokenPayload) => {
      currentGames[currentGameId].createToken(user.id, payload);
    });

    socket.on(SOCKET_MSG_GAME.COPY_CARD, (payload: CopyCardPayload) => {
      currentGames[currentGameId].copyCard(user.id, payload);
    });

    socket.on(SOCKET_MSG_GAME.TAP_CARDS, (payload: TapCardsPayload) => {
      currentGames[currentGameId].tapCards(payload);
    });

    socket.on(SOCKET_MSG_GAME.FLIP_CARDS, (payload: FlipCardsPayload) => {
      currentGames[currentGameId].flipCards(payload);
    });

    socket.on(SOCKET_MSG_GAME.ROTATE_CARDS, (payload: RotateCardsPayload) => {
      currentGames[currentGameId].rotateCards(payload);
    });

    socket.on(SOCKET_MSG_GAME.TURN_FACE_DOWN, (payload: TurnCardsFaceDownPayload) => {
      currentGames[currentGameId].turnCardsFaceDown(user.id, payload);
    });

    socket.on(SOCKET_MSG_GAME.PEEK_FACE_DOWN, (payload: PeekFaceDownPayload) => {
      currentGames[currentGameId].peekFaceDown(user.id, payload);
    });

    socket.on(
      SOCKET_MSG_GAME.PLAY_TOP_CARD_FACE_DOWN,
      (payload: PlayTopCardFaceDownPayload) => {
        currentGames[currentGameId].playTopCardFaceDown(user.id, payload.playerId);
      }
    );

    socket.on(SOCKET_MSG_GAME.MILL, (payload: MillPayload) => {
      currentGames[currentGameId].mill(user.id, payload);
    });

    socket.on(SOCKET_MSG_GAME.PEEK, (payload: PeekPayload) => {
      currentGames[currentGameId].peek(user.id, payload);
    });

    socket.on(SOCKET_MSG_GAME.END_PEEK, (payload: EndPeekPayload) => {
      currentGames[currentGameId].endPeek(user.id, payload);
    });

    socket.on(SOCKET_MSG_GAME.REVEAL_CARDS, (payload: RevealPayload) => {
      currentGames[currentGameId].revealCards(user.id, payload);
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

    socket.on(SOCKET_MSG_GAME.EXECUTE_COMMAND, (message: ChatCommandPayload) => {
      currentGames[currentGameId].executeCommand(user.id, message);
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

    socket.on(
      SOCKET_MSG_GAME.SET_COMMANDER_DAMAGE,
      (payload: SetCommanderDamagePayload) => {
        currentGames[currentGameId].setCommanderDamage(user.id, payload);
      }
    );

    socket.on(
      SOCKET_MSG_GAME.TRACK_FLOATING_MANA,
      (payload: TrackFloatingManaPayload) => {
        currentGames[currentGameId].trackFloatingMana(user.id, payload);
      }
    );

    socket.on(SOCKET_MSG_GAME.TOGGLE_STACK_OPEN, (payload: ToggleStackOpenPayload) => {
      currentGames[currentGameId].toggleStackOpen(payload);
    });

    socket.on(SOCKET_MSG_GAME.END_TURN, () => {
      currentGames[currentGameId].endTurn(user.id);
    });

    socket.on(SOCKET_MSG_GAME.SET_PHASE, (payload: SetPhasePayload) => {
      currentGames[currentGameId].setPhase(user.id, payload);
    });

    socket.on(SOCKET_MSG_GAME.SET_STOP_POINT, (payload: SetStopPointPayload) => {
      currentGames[currentGameId].setStopPoint(user.id, payload);
    });

    socket.on('disconnect', () => {
      if (!currentGames[currentGameId]) return;
      currentGames[currentGameId].storeGameState();
    });
  });
};

export default gameSocketActions;
