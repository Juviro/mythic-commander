import uniqid from 'uniqid';
import { Server, Socket } from 'socket.io';
import cloneDeep from 'lodash.clonedeep';

import {
  ActivePlane,
  BattlefieldCard,
  Card,
  FaceDownCard,
  GameState,
  Phase,
  PHASES,
  Player,
  PlayerZone,
  PlayerRematchOptions,
  VisibleBattlefieldCard,
  VisibleCard,
  Zone,
} from 'backend/database/gamestate.types';
import {
  AcceptHandPayload,
  AddCountersPayload,
  ChatCommandPayload,
  CopyCardPayload,
  CreateTokenPayload,
  DiscardRandomCardPayload,
  EndPeekPayload,
  TransformCardsPayload,
  MillPayload,
  MoveCardPayload,
  MoveCardsGroupPayload,
  PeekFaceDownPayload,
  PeekPayload,
  RevealPayload,
  RevealCardsFromHandPayload,
  FlipCardsPayload,
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
  HoverCardPayload,
  SetPlayWithTopCardRevealedPayload,
} from 'backend/constants/wsEvents';
import { User as DatabaseUser } from 'backend/database/getUser';
import {
  GameLog,
  LOG_MESSAGES,
  LogMessage,
  UNDOABLE_LOG_MESSAGES,
} from 'backend/constants/logMessages';
import { getGameState, storeGameState } from 'backend/database/matchStore';
import initMatch, { sortInitialHand } from 'backend/lobby/initMatch/initMatch';
import { randomizeArray } from 'utils/randomizeArray';
import db from 'backend/database/db';
import getPlaytestGamestate from 'backend/lobby/initMatch/getPlaytestGamestate';
import { XYCoord } from 'react-dnd';
import { LobbyDeck, PlanechaseSet } from 'backend/lobby/GameLobby.types';
import { DICE_ROLL_ANIMATION_DURATION } from 'components/Game/GameField/Planechase/PlanechaseDice';
import addLogEntry from './addLogEntry';
import getInitialCardProps from './utils/getInitialCardProps';

const MAX_UNDO_STATES = 10;

interface User {
  name: string;
  socket: Socket;
}
interface RequestedStopPoints {
  [playerId: string]: Phase;
}

interface UndoState {
  undoId: string;
  gameState: GameState;
  requestedStopPoints: RequestedStopPoints;
}

/* eslint-disable no-param-reassign */
export default class Game {
  server: Server;

  gameState: GameState;

  previousGameState: GameState;

  undoState: UndoState[] = [];

  isPlaytest: boolean;

  deckId: string;

  users: { [userId: string]: User } = {};

  requestedStopPoints: RequestedStopPoints = {};

  constructor(gameState: GameState, server: Server, isPlaytest = false, deckId = '') {
    this.server = server;
    this.gameState = gameState;
    this.isPlaytest = isPlaytest;
    this.deckId = deckId;
    this.undoState = [];
    this.previousGameState = gameState;

    if (!this.gameState.stack) {
      this.gameState.stack = { visible: false, cards: [] };
    }
    if (!this.gameState.hoveredCards) {
      this.gameState.hoveredCards = {};
    }
    if (!this.gameState.rematchOptions) {
      this.gameState.rematchOptions = {
        isModalOpen: false,
        planechaseOptions: [],
      };
    }
  }

  get id() {
    return this.gameState.gameId;
  }

  // ##################### Socket #####################

  emitToAll(msg: string, data: any) {
    this.server.to(this.id).emit(msg, data);
  }

  emitGameState(socket: Socket, playerId: string) {
    socket.emit(SOCKET_MSG_GAME.GAME_STATE, this.obfuscateGameState(playerId));

    if (this.requestedStopPoints[playerId]) {
      socket.emit(SOCKET_MSG_GAME.SET_STOP_POINT, {
        phase: this.requestedStopPoints[playerId],
      });
    }
  }

  emitGameStateToAll() {
    this.gameState.players.forEach(({ id }) => {
      const user = this.users[id];
      // might be undefined if player is not connected
      if (!user) return;
      this.emitGameState(user.socket, id);
    });
  }

  emitGameUpdate(emittedFields?: (keyof GameState)[]) {
    const {
      activePlayerId,
      phase,
      turn,
      winner,
      phaseStopByPlayerId,
      stack,
      rematchOptions,
      hoveredCards,
      planechase,
    } = this.gameState;

    const emittedGameState: Partial<GameState> = {
      activePlayerId,
      phase,
      turn,
      winner,
      phaseStopByPlayerId,
      rematchOptions,
      hoveredCards,
      stack: Game.obfuscateStack(stack),
      planechase: Game.obfuscatePlanechase(planechase),
    };

    if (emittedFields) {
      Object.keys(emittedGameState).forEach((key) => {
        if (!emittedFields.includes(key as keyof GameState)) {
          delete emittedGameState[key as keyof GameState];
        }
      });
    }

    this.emitToAll(SOCKET_MSG_GAME.GAME_STATE, emittedGameState);

    // this only triggers a single display message
    this.gameState.phaseStopByPlayerId = null;
  }

  emitPlayerUpdate(player: Player) {
    this.gameState.players.forEach(({ id: playerId }) => {
      const obfuscatedGameState = Game.obfuscatePlayer(player, playerId);
      // might be undefined if player is not connected
      const socketId = this.users[playerId]?.socket.id;
      if (!socketId) return;

      this.server.to(socketId).emit(SOCKET_MSG_GAME.UPDATE_PLAYER, obfuscatedGameState);
    });
  }

  join(socket: Socket, user: DatabaseUser) {
    this.users[user.id] = {
      name: user.username,
      socket,
    };

    socket.join(this.id);
    this.emitGameState(socket, user.id);
  }

  // ##################### Game #####################

  storeGameState() {
    if (this.isPlaytest) return;
    // currently, the game state is stored whenever the active player changes
    storeGameState(this.gameState.gameId, this.gameState);
  }

  async restartGame(playerId: string) {
    const player = this.getPlayerById(playerId);
    if (player.id !== this.gameState.hostId) return;

    const { lobby } = await getGameState(this.gameState.gameId);
    if (this.isPlaytest) {
      const newGameState = await getPlaytestGamestate(
        this.gameState.gameId,
        { ...player, avatar: '', username: player.name },
        this.deckId
      );
      this.gameState = newGameState;
    } else {
      await initMatch(lobby);
      const { gameState: newGameState } = await getGameState(this.gameState.gameId);

      this.gameState = newGameState;
      this.requestedStopPoints = {};
    }

    this.emitGameStateToAll();
  }

  async initiateRematch() {
    const { lobby } = await getGameState(this.gameState.gameId);

    this.gameState.players.forEach((player) => {
      const { deck } = lobby.players.find((p) => p.id === player.id)!;
      player.rematchOptions = { isReady: false, deck: deck as LobbyDeck };
    });
    this.gameState.rematchOptions!.isModalOpen = true;

    this.emitGameStateToAll();
  }

  async updateRematchOptions(playerId: string, rematchOptions: PlayerRematchOptions) {
    const player = this.getPlayerById(playerId);
    player.rematchOptions = {
      ...player.rematchOptions,
      ...rematchOptions,
    };

    const allPlayersReady = this.gameState.players.every(
      (p) => p.rematchOptions?.isReady
    );

    this.emitGameStateToAll();
    if (!allPlayersReady) {
      return;
    }

    this.gameState.rematchOptions!.isModalOpen = false;
    const { lobby } = await getGameState(this.gameState.gameId);
    const newlobby = {
      ...lobby,
      players: lobby.players.map((p) => {
        const currentPlayer = this.gameState.players.find(({ id }) => id === p.id)!;
        return {
          ...p,
          deck: currentPlayer.rematchOptions!.deck,
        };
      }),
    };

    await storeGameState(this.gameState.gameId, this.gameState, newlobby);
    this.restartGame(this.gameState.hostId);
  }

  async updateRematchPlanechaseOptions(
    playerId: string,
    planechaseOptions: PlanechaseSet[]
  ) {
    if (playerId !== this.gameState.hostId) return;

    this.gameState.rematchOptions!.planechaseOptions = planechaseOptions;
    const { lobby } = await getGameState(this.gameState.gameId);
    const newlobby = {
      ...lobby,
      planechaseSets: planechaseOptions,
    };

    await storeGameState(this.gameState.gameId, this.gameState, newlobby);
    this.emitGameStateToAll();
  }

  resign(playerId: string) {
    this.previousGameState = cloneDeep(this.gameState);
    const player = this.getPlayerById(playerId);
    player.resigned = true;

    const playersToUpdate = new Set<string>([playerId]);

    const playerZones = ['battlefield', 'hand', 'library', 'graveyard', 'exile'] as const;
    // clear own zones
    playerZones.forEach((zoneKey) => {
      const zone = player.zones[zoneKey];
      // give back cards to the owner
      (zone as BattlefieldCard[]).forEach((card) => {
        if (card.ownerId === player.id || card.isToken) return;
        const owner = this.getPlayerById(card.ownerId);
        if (owner.resigned) return;
        owner.zones[zoneKey].push(card as VisibleCard);
        playersToUpdate.add(card.ownerId);
      });
      player.zones[zoneKey] = [];
    });

    player.zones.commandZone = player.commanders.map((commander) => ({
      ...commander,
      ownerId: player.id,
    }));

    // remove owned cards from other players' zones
    ['battlefield', 'hand'].forEach((zoneKey) => {
      this.gameState.players.forEach((otherPlayer) => {
        if (otherPlayer.id === player.id) return;
        const zone = otherPlayer.zones[zoneKey as PlayerZone];
        // @ts-ignore
        otherPlayer.zones[zoneKey as Zone] = zone.filter((card) => {
          if (card.ownerId !== player.id) return true;
          if ((card as BattlefieldCard).isToken) return true;
          playersToUpdate.add(otherPlayer.id);
          return false;
        });
      });
    });

    const alivePlayers = this.gameState.players.filter((p) => !p.resigned);
    const isGameOver = alivePlayers.length <= 1;
    if (isGameOver) {
      this.gameState.winner = alivePlayers[0]?.name;
      this.emitGameUpdate();
    } else if (player.id === this.gameState.activePlayerId) {
      this.endTurn(playerId, true);
    }

    playersToUpdate.forEach((playerToUpdateId) => {
      const updatedPlayer = this.getPlayerById(playerToUpdateId);
      this.emitPlayerUpdate(updatedPlayer);
    });

    this.logAction({
      playerId: player.id,
      logKey: LOG_MESSAGES.PLAYER_DEFEATED,
      payload: {},
    });
  }

  // ##################### Utils #####################

  static obfuscatePlayer(player: Player, selfId: string): Player {
    const obfuscateCard = (card: Card) => {
      if ((card as VisibleCard).visibleTo?.includes(selfId)) {
        return card;
      }

      return {
        clashId: card.clashId,
        ownerId: card.ownerId,
      };
    };

    const isSelf = player.id === selfId;
    const hand = isSelf ? player.zones.hand : player.zones.hand.map(obfuscateCard);
    const battlefield = player.zones.battlefield.map((card) => {
      const isFaceDownCard = (c: BattlefieldCard): c is FaceDownCard => {
        return Boolean(c.faceDown);
      };

      if (!isFaceDownCard(card)) return card;

      const baseProps = {
        clashId: card.clashId,
        faceDown: true,
        position: card.position,
        tapped: card.tapped,
        counters: card.counters,
        ownerId: card.ownerId,
        visibleTo: card.visibleTo,
      };

      if (!card.visibleTo?.includes(selfId)) {
        return baseProps;
      }

      return {
        ...baseProps,
        id: card.id,
        name: card.name,
      };
    }) as BattlefieldCard[];

    const library = player.zones.library.map(obfuscateCard);
    if (player.playWithTopCardRevealed && player.zones.library.length > 0) {
      library.pop();
      library.push(player.zones.library[player.zones.library.length - 1]);
    }

    return {
      ...player,
      zones: {
        ...player.zones,
        library,
        battlefield,
        hand,
      },
    };
  }

  static obfuscateStack(stack: GameState['stack']) {
    if (!stack) {
      return {
        visible: false,
        cards: [],
      };
    }

    return {
      ...stack,
      cards: stack.cards.map((card) => {
        if (!(card as VisibleBattlefieldCard).faceDown) {
          return card;
        }

        return {
          ...card,
          id: null,
          name: '',
          manaValue: undefined,
          meta: null,
          produced_mana: undefined,
          layout: undefined,
          type_line: undefined,
          transformable: false,
          flippable: false,
        };
      }),
    };
  }

  static obfuscatePlanechase(planechase: GameState['planechase']) {
    if (!planechase) return undefined;

    return {
      ...planechase,
      planesDeck: planechase.planesDeck.map(({ clashId }) => ({ clashId })),
    };
  }

  static getFirstAvailablePosition(
    initalPosition: XYCoord,
    battlefield: BattlefieldCard[]
  ) {
    const doesCardExistAtPosition = (newPosition: XYCoord) => {
      return battlefield.some(
        (card) => card.position?.x === newPosition.x && card.position?.y === newPosition.y
      );
    };

    let stackedPosition = initalPosition;
    while (doesCardExistAtPosition(stackedPosition)) {
      stackedPosition = Game.getStackedPosition(stackedPosition);
    }
    return stackedPosition;
  }

  static fixPosition(position?: { x: number; y: number }) {
    if (!position) return position;

    return {
      x: Math.max(0, Math.min(100, position.x)),
      y: Math.max(0, Math.min(100, position.y)),
    };
  }

  static getStackedPosition(position: XYCoord, index = 1) {
    return {
      x: position.x + index * 1,
      y: position.y + index * 2,
    };
  }

  static getRandomValue(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  obfuscateGameState(playerId: string): GameState {
    const obfuscatedPlayers = this.gameState.players.map((player) => {
      return Game.obfuscatePlayer(player, playerId);
    });

    const obfuscatedPlanechase = Game.obfuscatePlanechase(this.gameState.planechase);

    return {
      ...this.gameState,
      players: obfuscatedPlayers,
      planechase: obfuscatedPlanechase,
    };
  }

  getPlayerById(playerId: string): Player {
    return this.gameState.players.find(({ id }) => id === playerId) as Player;
  }

  undo(undoId: string, playerId: string) {
    const isHost = this.gameState.hostId === playerId;
    if (!isHost) return;

    const undoStateIndex = this.undoState.findIndex((state) => state.undoId === undoId);
    if (undoStateIndex === -1) return;

    const numberOfUndos = this.undoState.length - undoStateIndex;
    this.gameState = this.undoState[undoStateIndex].gameState;
    this.requestedStopPoints = this.undoState[undoStateIndex].requestedStopPoints;

    this.undoState.splice(undoStateIndex, 1);

    this.logAction({
      playerId,
      logKey: LOG_MESSAGES.UNDO,
      payload: {
        numberOfUndos,
      },
    });

    this.emitGameStateToAll();
    this.previousGameState = cloneDeep(this.gameState);
  }

  storeUndoState(logKey: LogMessage['logKey']) {
    if (!UNDOABLE_LOG_MESSAGES.includes(logKey)) return undefined;

    const undoId = uniqid();

    if (this.undoState.length >= MAX_UNDO_STATES) {
      this.undoState.shift();
    }

    this.undoState.push({
      undoId,
      gameState: cloneDeep(this.previousGameState),
      requestedStopPoints: cloneDeep(this.requestedStopPoints),
    });

    const undoIds = this.undoState.map((state) => state.undoId);

    this.emitToAll(SOCKET_MSG_GAME.AVAILABLE_UNDO_IDS, undoIds);

    return undoId;
  }

  logAction(log: LogMessage) {
    const { logKey, payload, playerId } = log;
    if (logKey === 'MOVE_CARDS' && payload.to.zone === payload.from.zone) return;

    const undoId = this.storeUndoState(logKey);

    const newLogEntry = {
      playerId,
      timestamp: Date.now(),
      logKey,
      payload,
      undoId,
    } as GameLog;

    const oldLogLength = this.gameState.gameLog.length;
    const newLog = addLogEntry(this.gameState.gameLog, newLogEntry);

    this.gameState.gameLog = newLog;

    this.server.to(this.id).emit(SOCKET_MSG_GAME.GAME_LOG, {
      ...newLog.at(-1),
      overwritesPreviousLog: oldLogLength === newLog.length,
    });
  }

  // ##################### Actions #####################

  acceptHand(playerId: string, payload: AcceptHandPayload) {
    const player = this.getPlayerById(playerId);
    const { cardIdsToLibrary } = payload;

    const { hand, library } = player.zones;

    const newHand = hand.filter((card) => {
      const isCardToLibrary = cardIdsToLibrary.includes(card.clashId);
      if (isCardToLibrary) {
        library.unshift(card);
      }
      return !isCardToLibrary;
    });

    player.zones.hand = newHand;

    player.mulligan.cardsAccepted = true;

    this.emitPlayerUpdate(player);
    this.logAction({
      playerId: player.id,
      logKey: LOG_MESSAGES.ACCEPT_HAND,
      payload: {
        cardsKept: newHand.length,
      },
    });
  }

  takeMulligan(playerId: string) {
    const player = this.getPlayerById(playerId);
    const { mulligansTaken } = player.mulligan;
    const { hand, library } = player.zones;

    const shuffledCards = randomizeArray(library.concat(hand)) as VisibleCard[];

    const newHand = shuffledCards.splice(0, 7).sort(sortInitialHand);
    player.zones.library = shuffledCards;
    player.zones.hand = newHand;

    player.mulligan.mulligansTaken += 1;

    this.emitPlayerUpdate(player);
    this.logAction({
      playerId: player.id,
      logKey: LOG_MESSAGES.TAKE_MULLIGAN,
      payload: {
        mulligansTaken: mulligansTaken + 1,
      },
    });
  }

  drawCard(playerId: string) {
    this.previousGameState = cloneDeep(this.gameState);
    const player = this.getPlayerById(playerId);
    const card = player.zones.library.pop();
    if (!card) return;

    player.zones.hand.push(card);
    this.emitPlayerUpdate(player);
    this.logAction({
      playerId: player.id,
      logKey: LOG_MESSAGES.DRAW_CARD,
      payload: { amount: 1 },
    });
  }

  async moveCard(playerId: string, payload: MoveCardPayload) {
    this.previousGameState = cloneDeep(this.gameState);

    const { clashId, to, position, index, faceDown, skipUpdate } = payload;
    const isMovingOntoStack = to.zone === 'stack';

    if (isMovingOntoStack && !this.gameState.stack.visible) {
      this.gameState.stack.visible = true;
    }

    const playersToUpdate = new Set<string>(isMovingOntoStack ? [] : [to.playerId]);

    let fromPlayer: Player;
    let fromZone: Zone;
    let cardToMove: VisibleCard;
    let shouldEmitStackUpdate = false;

    let spliceIndex = -1;

    this.gameState.players.forEach((player) => {
      Object.entries(player.zones).forEach(([zone, cards]) => {
        return (cards as Card[]).some((card, i) => {
          if (card.clashId !== clashId) return false;
          fromPlayer = player;
          fromZone = zone as Zone;
          spliceIndex = i;
          cardToMove = cards.splice(i, 1)[0] as VisibleCard;
          return true;
        });
      });

      if (player.revealedCards) {
        player.revealedCards?.cards.forEach((card, i) => {
          if (card.clashId !== clashId) return;
          fromPlayer = player;
          spliceIndex = i;
          cardToMove = player.revealedCards!.cards.splice(i, 1)[0] as VisibleCard;
        });
        // close modal if last card is moved away
        if (!player.revealedCards.cards.length) {
          player.revealedCards = undefined;
        }
      }
    });

    this.gameState.stack?.cards.forEach((card, i) => {
      if (card.clashId !== clashId) return;
      shouldEmitStackUpdate = true;
      spliceIndex = i;
      cardToMove = this.gameState.stack?.cards.splice(i, 1)[0] as VisibleCard;
      fromZone = 'stack';
    });

    if (isMovingOntoStack) {
      if (fromPlayer!) {
        const player = this.getPlayerById(fromPlayer.id);
        this.emitPlayerUpdate(player);
      }

      if (typeof index === 'number') {
        const isMovingFromStack = fromZone! === 'stack';
        const addIndex = spliceIndex < index && isMovingFromStack ? index - 1 : index;
        this.gameState.stack?.cards.splice(addIndex, 0, cardToMove! as VisibleCard);
      } else {
        this.gameState.stack?.cards.push(cardToMove! as VisibleCard);
      }

      this.emitGameUpdate();
      return;
    }

    let newCard = { ...cardToMove!, position: Game.fixPosition(position) };
    const isCardFaceDown = faceDown ?? (cardToMove! as BattlefieldCard)?.faceDown;

    if (faceDown !== undefined) {
      (newCard as BattlefieldCard).faceDown = faceDown;
      if (faceDown) {
        const isFromVisibleZone = ['graveyard', 'battlefield', 'exile'].includes(
          fromZone!
        );
        const visibleTo = isFromVisibleZone
          ? this.gameState.players.map((p) => p.id)
          : [playerId];
        (newCard as unknown as FaceDownCard).visibleTo = visibleTo;
      }
    }

    if (to.zone === 'battlefield' && fromZone! !== 'battlefield' && !isCardFaceDown) {
      const additionalProps = await getInitialCardProps(newCard.id);
      newCard = { ...newCard, ...additionalProps };
    }

    let shouldDeleteCard = false;
    if (to.zone !== 'battlefield' && fromZone! === 'battlefield') {
      const card = newCard as VisibleBattlefieldCard;
      if (card.isToken) {
        shouldDeleteCard = true;
      }
      delete card.counters;
      delete card.tapped;
      delete card.transformed;
      delete card.flipped;
      delete card.faceDown;
      delete card.position;
      delete (card as FaceDownCard).visibleTo;
    }

    if (fromPlayer!) {
      if (fromPlayer.id !== to.playerId && !newCard.ownerId) {
        newCard.ownerId = fromPlayer!.id;
      }

      playersToUpdate.add(fromPlayer!.id);
    }

    let toPlayer = this.getPlayerById(to.playerId);

    if (to.zone === 'graveyard' || to.zone === 'exile') {
      toPlayer = this.getPlayerById(newCard.ownerId);
      playersToUpdate.add(toPlayer.id);
    }

    if (!shouldDeleteCard) {
      if (typeof index === 'number') {
        const isMovingToSameZone =
          fromZone! === to.zone && fromPlayer!.id === to.playerId;
        const addIndex = spliceIndex < index && isMovingToSameZone ? index - 1 : index;
        toPlayer.zones[to.zone].splice(addIndex, 0, newCard);
      } else {
        toPlayer.zones[to.zone].push(newCard);
      }
    }

    if (!skipUpdate) {
      playersToUpdate.forEach((playerToUpdateId) => {
        const updatedPlayer = this.getPlayerById(playerToUpdateId);
        this.emitPlayerUpdate(updatedPlayer);
      });

      if (shouldEmitStackUpdate) {
        this.emitGameUpdate();
      }
    }

    const getLibraryPosition = () => {
      if (typeof index !== 'number' || to.zone !== 'library') return null;
      if (index === 0) return 'bottom';
      if (index === toPlayer.zones.library.length - 1) return 'top';
      return toPlayer.zones.library.length - index;
    };

    const getCardName = () => {
      if (isCardFaceDown) {
        return 'a face down card';
      }
      let shouldRevealCardName = true;
      if (fromZone! === 'library' && to.zone === 'hand') {
        shouldRevealCardName = false;
      }
      if (fromZone! === 'hand' && to.zone === 'library') {
        shouldRevealCardName = false;
      }
      return shouldRevealCardName ? cardToMove!.name : null;
    };

    if (fromPlayer!) {
      this.logAction({
        playerId,
        logKey: LOG_MESSAGES.MOVE_CARDS,
        payload: {
          cardNames: [getCardName()],
          from: {
            zone: fromZone!,
            playerId: fromPlayer!.id,
          },
          to: {
            zone: to.zone,
            playerId: toPlayer.id,
            libraryPosition: getLibraryPosition(),
          },
        },
      });
    }
  }

  moveCardGroup(payload: MoveCardsGroupPayload) {
    const { cardIds, battlefieldPlayerId, delta } = payload;

    const cardsToMove: BattlefieldCard[] = [];

    const playerTo = this.getPlayerById(battlefieldPlayerId);
    const playerFrom = this.gameState.players.find(({ zones }) =>
      zones.battlefield.some((card) => cardIds.includes(card.clashId))
    )!;

    playerFrom.zones.battlefield = playerFrom.zones.battlefield.filter((card) => {
      if (cardIds.includes(card.clashId)) {
        cardsToMove.push(card);
        return false;
      }
      return true;
    });

    const updatedCards = cardsToMove.map((card) => {
      return {
        ...card,
        position: Game.fixPosition({
          x: card.position!.x + delta.x,
          y: card.position!.y + delta.y,
        }),
      };
    });

    playerTo.zones.battlefield.push(...updatedCards);

    this.emitPlayerUpdate(playerTo);
    if (playerFrom.id !== playerTo.id) {
      this.emitPlayerUpdate(playerFrom);
    }
  }

  discardRandomCard(payload: DiscardRandomCardPayload) {
    this.previousGameState = cloneDeep(this.gameState);
    const { playerId } = payload;
    const player = this.getPlayerById(playerId);

    const randomIndex = Math.floor(Math.random() * player.zones.hand.length);
    const card = player.zones.hand.splice(randomIndex, 1)[0] as VisibleCard;
    if (!card) return;

    player.zones.graveyard.push(card);

    this.emitPlayerUpdate(player);
    this.logAction({
      playerId,
      logKey: LOG_MESSAGES.DISCARD_RANDOM_CARD,
      payload: {
        cardName: card.name,
      },
    });
  }

  addCounters(playerId: string, payload: AddCountersPayload) {
    this.previousGameState = cloneDeep(this.gameState);
    const { cardIds, amount, type } = payload;

    const battlefieldPlayerId = this.gameState.players.find(({ zones }) =>
      zones.battlefield.some((card) => cardIds.includes(card.clashId))
    )?.id;

    // In this case, it might be a planechase counter
    if (!battlefieldPlayerId) {
      const isPlanechaseCounter =
        this.gameState.planechase?.activePlane?.clashId === cardIds[0];
      if (!isPlanechaseCounter) return;
      this.gameState.planechase!.activePlane.counters ??= 0;
      this.gameState.planechase!.activePlane.counters += amount;
      this.emitGameUpdate(['planechase']);

      this.logAction({
        playerId,
        logKey: LOG_MESSAGES.ADD_COUNTERS,
        payload: {
          cardNames: ['the active Plane'],
          cardIds,
          battlefieldPlayerId: null,
          amount,
          type,
        },
      });
      return;
    }

    const player = this.getPlayerById(battlefieldPlayerId);

    const cardNames: string[] = [];

    player.zones.battlefield.forEach((card) => {
      if (!cardIds.includes(card.clashId)) return;
      if (!card.counters) card.counters = {};
      cardNames.push((card as VisibleBattlefieldCard).name);

      if (type === 'm1/m1' || type === 'p1/p1') {
        const p1Counters = card.counters['p1/p1'] || 0;
        const m1Counters = card.counters['m1/m1'] || 0;
        const totalModification = p1Counters - m1Counters;
        const delta = type === 'p1/p1' ? amount : -amount;
        const newTotal = totalModification + delta;

        if (newTotal < 0) {
          card.counters['m1/m1'] = -newTotal;
          delete card.counters['p1/p1'];
        } else if (newTotal > 0) {
          card.counters['p1/p1'] = newTotal;
          delete card.counters['m1/m1'];
        } else {
          delete card.counters['p1/p1'];
          delete card.counters['m1/m1'];
        }
        return;
      }

      const newAmount = (card.counters[type] || 0) + amount;
      if (newAmount <= 0) {
        delete card.counters[type];
        return;
      }
      card.counters[type] = newAmount;
    });

    this.emitPlayerUpdate(player);

    this.logAction({
      playerId,
      logKey: LOG_MESSAGES.ADD_COUNTERS,
      payload: {
        cardNames,
        cardIds,
        battlefieldPlayerId,
        amount,
        type,
      },
    });
  }

  async createToken(playerId: string, payload: CreateTokenPayload) {
    this.previousGameState = cloneDeep(this.gameState);
    const { cardId, battlefieldPlayerId, name, position = { x: 50, y: 50 } } = payload;
    const player = this.getPlayerById(battlefieldPlayerId);

    const { type_line, produced_mana, layout } = await db('cards')
      .where({ id: cardId })
      .first();

    const stackedPosition = Game.getFirstAvailablePosition(
      position,
      player.zones.battlefield
    );

    const transformable =
      layout === 'transform' || layout === 'modal_dfc' || layout === 'double_faced_token';
    const flippable = layout === 'flip';

    const token: BattlefieldCard = {
      clashId: uniqid(),
      id: cardId,
      name,
      type_line,
      produced_mana,
      layout,
      ownerId: player.id,
      isToken: true,
      manaValue: 0,
      transformable,
      flippable,
      position: Game.fixPosition(stackedPosition),
    };

    player.zones.battlefield.push(token);

    this.emitPlayerUpdate(player);

    this.logAction({
      playerId,
      logKey: LOG_MESSAGES.CREATE_TOKEN,
      payload: {
        cardName: name,
        battlefieldPlayerId,
      },
    });
  }

  async copyCard(playerId: string, payload: CopyCardPayload) {
    this.previousGameState = cloneDeep(this.gameState);
    const { amount, battlefieldPlayerId, clashId } = payload;

    const player = this.getPlayerById(battlefieldPlayerId);
    const originalCard = player.zones.battlefield.find(
      (card) => card.clashId === clashId
    )!;

    for (let i = 0; i < amount; i += 1) {
      if (originalCard.faceDown) return;

      const newPosition = Game.getFirstAvailablePosition(
        originalCard.position!,
        player.zones.battlefield
      );

      // eslint-disable-next-line no-await-in-loop
      const additionalProps = await getInitialCardProps(originalCard.id);
      const newCard: VisibleBattlefieldCard = {
        id: originalCard.id,
        clashId: uniqid(),
        name: originalCard.name,
        ownerId: originalCard.ownerId,
        manaValue: originalCard.manaValue,
        type_line: originalCard.type_line,
        produced_mana: originalCard.produced_mana,
        meta: {
          ...originalCard.meta,
          isCardCopy: !originalCard.isToken || originalCard.meta?.isCardCopy,
        },
        position: Game.fixPosition(newPosition),
        isToken: true,
        ...additionalProps,
      };
      player.zones.battlefield.push(newCard);
    }
    this.emitPlayerUpdate(player);

    this.logAction({
      playerId,
      logKey: LOG_MESSAGES.COPY_CARD,
      payload: {
        amount,
        battlefieldPlayerId,
        cardName: (originalCard as VisibleBattlefieldCard).name,
      },
    });
  }

  tapCards(payload: TapCardsPayload) {
    const { type, battlefieldPlayerId, tapped: overwriteTapped } = payload;
    let { cardIds } = payload;

    if (!cardIds && !type) {
      throw new Error('Either cardIds or type must be provided');
    }

    const player = this.getPlayerById(battlefieldPlayerId);

    if (type) {
      cardIds = [];
      player.zones.battlefield.forEach((card) => {
        const supertype = (card as VisibleCard).type_line;
        if (type !== 'All' && !supertype.includes(type)) return;
        cardIds!.push(card.clashId);
      });
    }

    const areAnyCardsUntapped = player.zones.battlefield.some(({ clashId, tapped }) => {
      return cardIds!.includes(clashId) ? !tapped : false;
    });

    const tapped = overwriteTapped ?? areAnyCardsUntapped;

    player.zones.battlefield.forEach((card) => {
      if (!cardIds!.includes(card.clashId)) return;
      card.tapped = tapped;
    });

    this.emitPlayerUpdate(player);
  }

  transformCards(payload: TransformCardsPayload) {
    const { cardIds, battlefieldPlayerId, transformed: overwriteTransformed } = payload;

    const player = this.getPlayerById(battlefieldPlayerId);

    player.zones.battlefield.forEach((card) => {
      if (!cardIds.includes(card.clashId)) return;
      if (card.faceDown) return;
      if (!card.transformable) return;

      card.transformed = overwriteTransformed ?? !card.transformed;
    });

    this.emitPlayerUpdate(player);
  }

  flipCards(payload: FlipCardsPayload) {
    const { cardIds, battlefieldPlayerId } = payload;

    const player = this.getPlayerById(battlefieldPlayerId);

    player.zones.battlefield.forEach((card) => {
      if (!cardIds.includes(card.clashId)) return;
      if (card.faceDown) return;

      card.flipped = !card.flipped;
    });

    this.emitPlayerUpdate(player);
  }

  turnCardsFaceDown(playerId: string, payload: TurnCardsFaceDownPayload) {
    this.previousGameState = cloneDeep(this.gameState);
    const { cardIds, battlefieldPlayerId, faceDown: overwriteTransformed } = payload;

    const player = this.getPlayerById(battlefieldPlayerId);

    const cardNames: string[] = [];
    let faceDown = overwriteTransformed;

    player.zones.battlefield.forEach((card) => {
      if (!cardIds.includes(card.clashId)) return;
      card.faceDown = overwriteTransformed ?? !card.faceDown;
      faceDown = card.faceDown;
      card.clashId = uniqid();
      cardNames.push((card as VisibleBattlefieldCard).name);
      if (card.faceDown) {
        delete card.tapped;
        delete card.transformed;
        const playerIds = this.gameState.players.map((p) => p.id);
        (card as FaceDownCard).visibleTo = playerIds;
      }
    });

    this.emitPlayerUpdate(player);

    this.logAction({
      playerId,
      logKey: LOG_MESSAGES.TURN_FACE_DOWN,
      payload: {
        battlefieldPlayerId,
        cardNames,
        faceDown: Boolean(faceDown),
      },
    });
  }

  peekFaceDown(playerId: string, payload: PeekFaceDownPayload) {
    const { cardId, battlefieldPlayerId } = payload;

    const player = this.getPlayerById(battlefieldPlayerId);

    player.zones.battlefield.forEach((card) => {
      if (card.clashId !== cardId) return;
      const faceDownCard = card as FaceDownCard;
      faceDownCard.visibleTo = faceDownCard.visibleTo || [];
      if (!faceDownCard.visibleTo.includes(playerId)) {
        faceDownCard.visibleTo.push(playerId);
      }
    });

    this.emitPlayerUpdate(player);

    this.logAction({
      playerId,
      logKey: LOG_MESSAGES.PEEK_FACE_DOWN,
      payload: {
        battlefieldPlayerId,
        clashId: cardId,
      },
    });
  }

  playTopCardFaceDown(executingPlayerId: string, libraryPlayerId: string) {
    this.previousGameState = cloneDeep(this.gameState);
    const player = this.getPlayerById(libraryPlayerId);

    const card = player.zones.library.pop() as VisibleCard;
    if (!card) return;
    player.zones.battlefield.push({
      ...card,
      faceDown: true,
      position: { x: 50, y: 50 },
    });

    this.emitPlayerUpdate(player);

    this.logAction({
      playerId: executingPlayerId,
      logKey: LOG_MESSAGES.PLAY_TOP_CARD_FACE_DOWN,
      payload: {
        libraryPlayerId,
      },
    });
  }

  mill(millingPlayerId: string, payload: MillPayload) {
    this.previousGameState = cloneDeep(this.gameState);
    const { amount, playerId } = payload;
    const millingPlayer = this.getPlayerById(millingPlayerId);
    const player = this.getPlayerById(playerId);

    const milledCards = player.zones.library.splice(-amount) as VisibleCard[];
    player.zones.graveyard.push(...milledCards);

    this.emitPlayerUpdate(player);

    this.logAction({
      playerId: millingPlayer.id,
      logKey: LOG_MESSAGES.MILL,
      payload: {
        peekedPlayerId: player.id,
        amount,
      },
    });
  }

  peek(peekingPlayerId: string, payload: PeekPayload) {
    const { amount, zone, playerId } = payload;
    const peekingPlayer = this.getPlayerById(peekingPlayerId);
    const player = this.getPlayerById(playerId);

    const peekedCards = player.zones[zone].slice(-amount);

    const socket = this.users[peekingPlayerId]?.socket;

    socket.emit(SOCKET_MSG_GAME.PEEK, {
      zone,
      playerId,
      cards: peekedCards,
    });

    this.logAction({
      playerId: peekingPlayer.id,
      logKey: LOG_MESSAGES.PEEK,
      payload: {
        peekedPlayerId: player.id,
        amount,
        zone,
      },
    });
  }

  endPeek(peekingPlayerId: string, payload: EndPeekPayload) {
    const peekingPlayer = this.getPlayerById(peekingPlayerId);
    const {
      playerId,
      cardsToBottom: cardIdsToBottom,
      cardsToTop: cardIdsToTop,
      randomizeBottomCards,
      shuffleLibrary,
    } = payload;
    const player = this.getPlayerById(playerId);

    let cardsToBottom = cardIdsToBottom.map(
      (id) => player.zones.library.find((card) => card.clashId === id)!
    );
    const cardsToTop = cardIdsToTop.map(
      (id) => player.zones.library.find((card) => card.clashId === id)!
    );
    player.zones.library = player.zones.library.filter((card) => {
      return (
        !cardIdsToTop.includes(card.clashId) && !cardIdsToBottom.includes(card.clashId)
      );
    });

    if (randomizeBottomCards) {
      cardsToBottom = randomizeArray(cardsToBottom);
    }
    if (shuffleLibrary) {
      player.zones.library = randomizeArray(player.zones.library);
    }

    player.zones.library.unshift(...cardsToBottom);
    player.zones.library.push(...cardsToTop);

    this.emitPlayerUpdate(player);

    this.logAction({
      playerId: peekingPlayer.id,
      logKey: LOG_MESSAGES.END_PEEK,
      payload: {
        playerId,
        amountToBottom: cardsToBottom.length,
        amountToTop: cardsToTop.length,
        randomizeBottomCards,
        shuffleLibrary,
      },
    });
  }

  revealCards(playerId: string, payload: RevealPayload) {
    const { zone, amount = 1 } = payload;

    const player = this.getPlayerById(playerId);
    if (!player.revealedCards) {
      player.revealedCards = {
        zone,
        cards: [],
      };
    }

    player.revealedCards.zone = zone;

    const revealedCards = (
      amount ? player.zones[zone].splice(-amount) : []
    ) as VisibleCard[];
    player.revealedCards.cards.push(...revealedCards);

    this.emitPlayerUpdate(player);
  }

  revealCardsFromHand(playerId: string, payload: RevealCardsFromHandPayload) {
    const { cardIds, toPlayerIds } = payload;
    const player = this.getPlayerById(playerId);

    const cardsToReveal = player.zones.hand.filter((card) =>
      cardIds.includes(card.clashId)
    ) as VisibleCard[];

    cardsToReveal.forEach((card) => {
      if (!card.visibleTo) {
        card.visibleTo = [];
      }
      card.visibleTo.push(...toPlayerIds);
      card.visibleTo = [...new Set(card.visibleTo)];
    });

    const didRevealAllCards = player.zones.hand.length === cardsToReveal.length;

    this.emitPlayerUpdate(player);

    this.logAction({
      playerId: player.id,
      logKey: LOG_MESSAGES.REVEAL_CARDS_FROM_HAND,
      payload: {
        amount: cardsToReveal.length,
        toPlayerIds,
        didRevealAllCards,
      },
    });
  }

  searchLibrary(searchingPlayerId: string, payload: SearchLibraryPayload) {
    const { playerId } = payload;
    const searchingPlayer = this.getPlayerById(searchingPlayerId);
    const player = this.getPlayerById(playerId);

    const socket = this.users[searchingPlayerId]?.socket;

    socket.emit(SOCKET_MSG_GAME.PEEK, {
      zone: 'library',
      playerId,
      isSearch: true,
      cards: player.zones.library,
    });

    this.logAction({
      playerId: searchingPlayer.id,
      logKey: LOG_MESSAGES.SEARCH_LIBRARY,
      payload: {
        libraryPlayerId: player.id,
      },
    });
  }

  shuffleLibrary(playerId: string) {
    this.previousGameState = cloneDeep(this.gameState);
    const player = this.getPlayerById(playerId);
    player.zones.library = randomizeArray(player.zones.library);

    this.emitPlayerUpdate(player);

    this.logAction({
      playerId: player.id,
      logKey: LOG_MESSAGES.SHUFFLE_LIBRARY,
      payload: {},
    });
  }

  sendChatMessage(playerId: string, { message }: SendMessagePayload) {
    const player = this.getPlayerById(playerId);
    this.logAction({
      playerId: player.id,
      logKey: LOG_MESSAGES.CHAT_MESSAGE,
      payload: { message: message.slice(0, 1000) },
    });
  }

  executeCommand(playerId: string, { args, command }: ChatCommandPayload) {
    const player = this.getPlayerById(playerId);

    if (command === 'flip') {
      const numberOfCoins = Math.min(Math.max(args.numberOfCoins, 1), 100);
      const results = Array.from({ length: numberOfCoins }, () =>
        Game.getRandomValue(0, 1)
      );
      const numberOfWonFlips = results.filter((result) => result === 1).length;

      this.logAction({
        playerId: player.id,
        logKey: LOG_MESSAGES.EXECUTE_COMMAND,
        payload: {
          command,
          numberOfCoins,
          numberOfWonFlips,
        },
      });
      return;
    }

    if (command === 'roll') {
      const sides = Math.min(Math.max(args.sides, 2), 20);
      const numberOfDice = Math.min(Math.max(args.numberOfDice, 1), 20);

      const results = Array.from({ length: numberOfDice }, () =>
        Game.getRandomValue(1, sides)
      );
      this.logAction({
        playerId: player.id,
        logKey: LOG_MESSAGES.EXECUTE_COMMAND,
        payload: {
          command,
          sides,
          numberOfDice,
          results,
        },
      });
      return;
    }

    const socket = this.users[playerId]?.socket;

    socket?.emit(SOCKET_MSG_GENERAL.ERROR, `Invalid command: ${command}`);
  }

  setCommanderTimesCasted(playerId: string, payload: SetCommanderTimesCastedPayload) {
    const player = this.getPlayerById(playerId);

    const isOwnCommander = player.commanders.some(
      ({ clashId }) => clashId === payload.commanderClashId
    );

    if (!isOwnCommander || payload.total < 0) return;

    let commanderName = '';
    let previousTotal = 0;
    player.commanders.forEach((commander) => {
      if (commander.clashId !== payload.commanderClashId) return;
      previousTotal = commander.timesCasted;
      commander.timesCasted = payload.total;
      commanderName = commander.name;
    })!;

    this.emitPlayerUpdate(player);
    this.logAction({
      playerId: player.id,
      logKey: LOG_MESSAGES.SET_COMMANDER_TIMES_CASTED,
      payload: {
        ...payload,
        previousTotal,
        commanderName,
      },
    });
  }

  setPlayerLife(playerId: string, payload: SetPlayerLifePayload) {
    const player = this.getPlayerById(playerId);

    let previousTotal = 0;
    this.gameState.players.forEach((p) => {
      if (p.id !== payload.forPlayerId) return;
      previousTotal = p.life;
      p.life = payload.total;
    });

    const forPlayer = this.getPlayerById(payload.forPlayerId);

    this.emitPlayerUpdate(forPlayer);
    this.logAction({
      playerId: player.id,
      logKey: LOG_MESSAGES.SET_LIFE,
      payload: {
        ...payload,
        previousTotal,
        fromPlayerId: player.id,
      },
    });
  }

  setCommanderDamage(playerId: string, payload: SetCommanderDamagePayload) {
    const { commanderId, forPlayerId, total, changeLife } = payload;

    const player = this.getPlayerById(playerId);

    let previousTotal = 0;
    let commanderOwnerId: string;
    let commanderName: string;

    this.gameState.players.forEach((p) => {
      p.commanders.forEach((commander) => {
        if (commander.clashId !== commanderId) return;
        previousTotal = commander.commanderDamageDealt[forPlayerId] || 0;
        commander.commanderDamageDealt[forPlayerId] = Math.max(total, 0);
        commanderOwnerId = p.id;
        commanderName = commander.name;

        if (!changeLife || total < 0) return;

        const delta = total - previousTotal;
        const damagedPlayer = this.getPlayerById(forPlayerId);
        damagedPlayer.life -= delta;
        this.emitPlayerUpdate(damagedPlayer);
      });
    });

    if (previousTotal === 0 && total < 0) {
      return;
    }

    const forPlayer = this.getPlayerById(commanderOwnerId!);
    this.emitPlayerUpdate(forPlayer);

    this.logAction({
      playerId: player.id,
      logKey: LOG_MESSAGES.SET_COMMANDER_DAMAGE,
      payload: {
        ...payload,
        total: Math.max(total, 0),
        previousTotal,
        commanderName: commanderName!,
        fromPlayerId: player.id,
      },
    });
  }

  trackFloatingMana(playerId: string, payload: TrackFloatingManaPayload) {
    const player = this.getPlayerById(playerId);

    if (!player.activeUtils) {
      player.activeUtils = {};
    }

    if (!player.activeUtils.floatingMana) {
      player.activeUtils.floatingMana = {
        mana: {},
      };
    }

    player.activeUtils.floatingMana = {
      ...player.activeUtils.floatingMana,
      ...payload,
      mana: {
        ...player.activeUtils.floatingMana.mana,
        ...payload.mana,
      },
    };

    this.emitPlayerUpdate(this.getPlayerById(playerId));
  }

  toggleStackOpen({ visible }: ToggleStackOpenPayload) {
    this.gameState.stack.visible = visible;
    this.emitGameUpdate(['stack']);
  }

  hoverCard(playerId: string, payload: HoverCardPayload) {
    this.gameState.hoveredCards[playerId] = {
      ...payload,
      timestamp: Date.now(),
    };
    this.emitGameUpdate(['hoveredCards']);
  }

  endTurn(playerId: string, force = false) {
    this.previousGameState = cloneDeep(this.gameState);
    const player = this.getPlayerById(playerId);
    const { players, activePlayerId } = this.gameState;
    if (!force) {
      const hasStopPoint = this.checkForStopPoints('end');
      if (hasStopPoint) {
        return;
      }
    }

    const alivePlayers = players.filter((p) => !p.resigned);
    const activePlayerIndex = alivePlayers.findIndex(({ id }) => id === activePlayerId);

    const newActivePlayerIndex = (activePlayerIndex + 1) % alivePlayers.length;

    if (newActivePlayerIndex === 0) {
      this.gameState.turn += 1;
    }

    this.gameState.activePlayerId = alivePlayers[newActivePlayerIndex].id;
    this.gameState.phase = 'beginning';
    if (this.gameState.planechase) {
      this.gameState.planechase.diceRollCost = 0;
    }

    this.emitGameUpdate();

    this.storeGameState();

    this.logAction({
      playerId: player.id,
      logKey: LOG_MESSAGES.SET_ACTIVE_PLAYER,
      payload: {
        activePlayerId: players[newActivePlayerIndex].id,
      },
    });
  }

  checkForStopPoints(nextPhase: Phase) {
    const requestedStopPoints = Object.entries(this.requestedStopPoints)
      .filter(([_, phase]) => PHASES.indexOf(phase) <= PHASES.indexOf(nextPhase))
      .sort((a, b) => {
        if (a[1] !== b[1]) {
          return PHASES.indexOf(a[1]) - PHASES.indexOf(b[1]);
        }

        const activePlayerIndex = this.gameState.players.findIndex(
          ({ id }) => id === this.gameState.activePlayerId
        );
        const aIndex = this.gameState.players.findIndex(({ id }) => id === a[0]);
        const bIndex = this.gameState.players.findIndex(({ id }) => id === b[0]);

        if (aIndex > activePlayerIndex === bIndex > activePlayerIndex) {
          return aIndex - bIndex;
        }
        return bIndex - aIndex;
      }) as [string, Phase][];

    if (!requestedStopPoints.length) return false;

    const [requesterId, inPhase] = requestedStopPoints[0];
    this.gameState.phase = inPhase;
    this.gameState.phaseStopByPlayerId = requesterId;
    delete this.requestedStopPoints[requesterId];
    this.emitGameUpdate();
    return true;
  }

  setPhase(playerId: string, payload: SetPhasePayload) {
    this.previousGameState = cloneDeep(this.gameState);
    const player = this.getPlayerById(playerId);

    this.gameState.phase = payload.phase;

    const activePlayer = this.getPlayerById(this.gameState.activePlayerId);

    const hasStopPoint = this.checkForStopPoints(payload.phase);
    if (hasStopPoint) {
      return;
    }

    this.emitGameUpdate();

    this.logAction({
      playerId: player.id,
      logKey: LOG_MESSAGES.SET_PHASE,
      payload: {
        ...payload,
        activePlayerId: activePlayer.id,
      },
    });
  }

  setStopPoint(playerId: string, payload: SetStopPointPayload) {
    const stopPhaseIndex = PHASES.indexOf(payload.phase);
    const currentPhaseIndex = PHASES.indexOf(this.gameState.phase);

    if (stopPhaseIndex <= currentPhaseIndex) {
      return;
    }
    if (this.gameState.activePlayerId === playerId) {
      return;
    }

    if (this.requestedStopPoints[playerId] === payload.phase) {
      delete this.requestedStopPoints[playerId];
    } else {
      this.requestedStopPoints[playerId] = payload.phase;
    }

    const socket = this.users[playerId]?.socket;
    socket.emit(SOCKET_MSG_GAME.SET_STOP_POINT, {
      phase: this.requestedStopPoints[playerId],
    });
  }

  rollPlanarDice(playerId: string) {
    this.previousGameState = cloneDeep(this.gameState);
    if (playerId !== this.gameState.activePlayerId || !this.gameState.planechase) {
      return;
    }

    const getResult = () => {
      const roll = Game.getRandomValue(1, 6);
      if (roll === 1) return 'chaos';
      if (roll === 6) return 'planeswalk';
      return 'empty';
    };

    this.gameState.planechase.lastDiceResult = getResult();
    this.gameState.planechase.diceRollCost += 1;
    this.gameState.planechase.lastDiceRollTimestamp = Date.now();

    this.emitGameUpdate(['planechase']);

    // Make sure the log action is executed after the dice roll animation
    setTimeout(() => {
      this.logAction({
        playerId,
        logKey: LOG_MESSAGES.ROLL_PLANAR_DICE,
        payload: {
          result: this.gameState.planechase!.lastDiceResult,
        },
      });
    }, DICE_ROLL_ANIMATION_DURATION);
  }

  planeswalk(playerId: string) {
    this.previousGameState = cloneDeep(this.gameState);
    if (
      playerId !== this.gameState.activePlayerId ||
      !this.gameState.planechase ||
      !this.gameState.planechase.planesDeck.length
    ) {
      return;
    }

    const getOldPlaneText = () => {
      const oldOracleText = this.gameState.planechase!.activePlane.oracle_text ?? '';
      const oracleLines = oldOracleText.split('\n');
      const oldPlaneText = oracleLines.find((line) =>
        line.toLowerCase().startsWith('when you planeswalk away from')
      );
      return oldPlaneText;
    };

    const oldPlaneText = getOldPlaneText();

    this.gameState.planechase.activePlane.counters = 0;
    this.gameState.planechase.activePlane =
      this.gameState.planechase.planesDeck.pop() as ActivePlane;
    this.gameState.planechase.planesDeck.unshift(this.gameState.planechase.activePlane);

    this.emitGameUpdate(['planechase']);

    this.logAction({
      playerId,
      logKey: LOG_MESSAGES.PLANESWALK,
      payload: {
        newPlaneName: this.gameState.planechase.activePlane.name,
        oldPlaneText,
      },
    });
  }

  returnRandomCardFromGraveyard(playerId: string) {
    this.previousGameState = cloneDeep(this.gameState);
    const player = this.getPlayerById(playerId);
    const { graveyard, hand } = player.zones;

    if (!graveyard.length) return;

    const randomIndex = Math.floor(Math.random() * graveyard.length);
    const card = graveyard.splice(randomIndex, 1)[0] as VisibleCard;
    hand.push(card);

    this.emitPlayerUpdate(player);
    this.logAction({
      playerId: player.id,
      logKey: LOG_MESSAGES.RETURN_RANDOM_CARD_FROM_GRAVEYARD,
      payload: {
        cardName: card.name,
      },
    });
  }

  setPlayWithTopCardRevealed(
    playerId: string,
    payload: SetPlayWithTopCardRevealedPayload
  ) {
    const player = this.getPlayerById(playerId);

    player.playWithTopCardRevealed = payload.revealed;

    this.emitPlayerUpdate(player);
  }
}
