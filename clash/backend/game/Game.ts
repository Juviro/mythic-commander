import uniqid from 'uniqid';
import { Server, Socket } from 'socket.io';

import {
  BattlefieldCard,
  Card,
  GameState,
  Player,
  VisibleCard,
  Zone,
} from 'backend/database/gamestate.types';
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
  SearchLibraryPayload,
  SendMessagePayload,
  SetCommanderTimesCastedPayload,
  SetPhasePayload,
  SetPlayerLifePayload,
  TapCardsPayload,
} from 'backend/constants/wsEvents';
import { User as DatabaseUser } from 'backend/database/getUser';
import { GameLog, LOG_MESSAGES, LogMessage } from 'backend/constants/logMessages';
import { getGameState, storeGameState } from 'backend/database/matchStore';
import initMatch from 'backend/lobby/initMatch/initMatch';
import { randomizeArray } from 'utils/randomizeArray';
import addLogEntry from './addLogEntry';
import getInitialCardProps from './utils/getInitialCardProps';

interface User {
  name: string;
  socket: Socket;
}

/* eslint-disable no-param-reassign */
export default class Game {
  server: Server;

  gameState: GameState;

  users: { [userId: string]: User } = {};

  constructor(gameState: GameState, server: Server) {
    this.server = server;
    this.gameState = gameState;
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
  }

  emitGameUpdate() {
    const { activePlayerId, phase, turn } = this.gameState;
    this.emitToAll(SOCKET_MSG_GAME.GAME_STATE, { activePlayerId, phase, turn });
  }

  emitPlayerUpdate(player: Player) {
    // might be undefined if player is not connected
    const thatPlayerId = this.users[player.id]?.socket.id;
    const messageToThatPlayer = Game.obfuscatePlayer(player, true);
    const messageToOtherPlayers = Game.obfuscatePlayer(player, false);

    this.server.to(thatPlayerId).emit(SOCKET_MSG_GAME.UPDATE_PLAYER, messageToThatPlayer);
    this.server
      .to(this.id)
      .except(thatPlayerId)
      .emit(SOCKET_MSG_GAME.UPDATE_PLAYER, messageToOtherPlayers);
  }

  join(socket: Socket, user: DatabaseUser) {
    // eslint-disable-next-line no-console
    console.log('join', user.id);
    this.users[user.id] = {
      name: user.username,
      socket,
    };

    socket.join(this.id);
    this.emitGameState(socket, user.id);
  }

  // ##################### Game #####################

  storeGameState() {
    // currently, the game state is stored whenever the active player changes
    storeGameState(this.gameState.gameId, this.gameState);
  }

  async restartGame(socket: Socket) {
    const player = this.getPlayerBySocket(socket);
    if (player.id !== this.gameState.hostId) return;

    const { lobby } = await getGameState(this.gameState.gameId);
    await initMatch(lobby);
    const { gameState: newGameState } = await getGameState(this.gameState.gameId);

    this.gameState = newGameState;

    newGameState.players.forEach(({ id: playerId }) => {
      const user = this.users[playerId];
      // might be undefined if player is not connected
      if (!user) return;
      this.emitGameState(user.socket, playerId);
    });
  }

  // ##################### Utils #####################

  static obfuscatePlayer(player: Player, isSelf: boolean): Player {
    const obfuscateCard = ({ clashId, ownerId }: Card) => ({ clashId, ownerId });

    const hand = isSelf ? player.zones.hand : player.zones.hand.map(obfuscateCard);

    return {
      ...player,
      zones: {
        ...player.zones,
        library: player.zones.library.map(obfuscateCard),
        hand,
      },
    };
  }

  static fixPosition(position?: { x: number; y: number }) {
    if (!position) return position;

    return {
      x: Math.max(0, Math.min(100, position.x)),
      y: Math.max(0, Math.min(100, position.y)),
    };
  }

  obfuscateGameState(playerId: string): GameState {
    const obfuscatedPlayers = this.gameState.players.map((player) => {
      const isSelf = player.id === playerId;
      return Game.obfuscatePlayer(player, isSelf);
    });

    return { ...this.gameState, players: obfuscatedPlayers };
  }

  getPlayerById(playerId: string): Player {
    return this.gameState.players.find(({ id }) => id === playerId) as Player;
  }

  getPlayerBySocket(socket: Socket): Player {
    // eslint-disable-next-line no-console
    console.log('getPlayerBySocket', this.users);
    const userId = Object.entries(this.users).find(
      ([, { socket: s }]) => s === socket
    )![0];
    return this.getPlayerById(userId);
  }

  logAction(log: LogMessage) {
    const { logKey, payload, playerId } = log;
    if (logKey === 'MOVE_CARD' && payload.to.zone === payload.from.zone) return;

    const newLogEntry = {
      playerId,
      timestamp: Date.now(),
      logKey,
      payload,
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

  acceptHand(socket: Socket, payload: AcceptHandPayload) {
    const player = this.getPlayerBySocket(socket);
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

  takeMulligan(socket: Socket) {
    const player = this.getPlayerBySocket(socket);
    const { mulligansTaken } = player.mulligan;
    const { hand, library } = player.zones;

    const shuffledCards = randomizeArray(library.concat(hand)) as VisibleCard[];

    const newHand = shuffledCards.splice(0, 7).sort((a, b) => a.manaValue - b.manaValue);
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

  drawCard(socket: Socket) {
    const player = this.getPlayerBySocket(socket);
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

  async moveCard(socket: Socket, payload: MoveCardPayload) {
    const { clashId, to, position, index } = payload;
    const playersToUpdate = new Set<string>([to.playerId]);

    let fromPlayer: Player;
    let fromZone: Zone;
    let cardToMove: VisibleCard;

    let spliceIndex = -1;

    this.gameState.players.forEach((player) =>
      Object.entries(player.zones).forEach(([zone, cards]) =>
        (cards as Card[]).some((card, i) => {
          if (card.clashId !== clashId) return false;
          fromPlayer = player;
          fromZone = zone as Zone;
          spliceIndex = i;
          cardToMove = cards.splice(i, 1)[0] as VisibleCard;
          return true;
        })
      )
    );

    let newCard = { ...cardToMove!, position: Game.fixPosition(position) };

    if (to.zone === 'battlefield' && fromZone! !== 'battlefield') {
      const additionalProps = await getInitialCardProps(newCard.id);
      newCard = { ...newCard, ...additionalProps };
    }
    let shouldDeleteCard = false;
    if (to.zone !== 'battlefield' && fromZone! === 'battlefield') {
      const card = newCard as BattlefieldCard;
      if (card.isToken) {
        shouldDeleteCard = true;
      }
      delete card.counters;
      delete card.tapped;
      delete card.flipped;
      delete card.faceDown;
      delete card.position;
    }

    if (fromPlayer!.id !== to.playerId && !newCard.ownerId) {
      newCard.ownerId = fromPlayer!.id;
    }

    playersToUpdate.add(fromPlayer!.id);
    const toPlayer = this.getPlayerById(to.playerId);
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

    playersToUpdate.forEach((playerId) => {
      const player = this.getPlayerById(playerId);
      this.emitPlayerUpdate(player);
    });

    let shouldRevealCardName = true;
    if (fromZone! === 'library' && to.zone === 'hand') {
      shouldRevealCardName = false;
    }
    if (fromZone! === 'hand' && to.zone === 'library') {
      shouldRevealCardName = false;
    }

    const getLibraryPosition = () => {
      if (typeof index !== 'number' || to.zone !== 'library') return null;
      if (index === 0) return 'bottom';
      if (index === toPlayer.zones.library.length - 1) return 'top';
      return toPlayer.zones.library.length - index;
    };

    const playerId = this.getPlayerBySocket(socket).id;
    this.logAction({
      playerId,
      logKey: LOG_MESSAGES.MOVE_CARD,
      payload: {
        cardName: shouldRevealCardName ? cardToMove!.name : null,
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

  addCounters(payload: AddCountersPayload) {
    const { cardIds, amount, type, subtract } = payload;

    const battlefieldPlayerId = this.gameState.players.find(({ zones }) =>
      zones.battlefield.some((card) => cardIds.includes(card.clashId))
    )!.id;

    const player = this.getPlayerById(battlefieldPlayerId);

    player.zones.battlefield.forEach((card) => {
      if (!cardIds.includes(card.clashId)) return;
      if (!card.counters) card.counters = {};

      if (type === 'm1/m1' || type === 'p1/p1') {
        const p1Counters = card.counters['p1/p1'] || 0;
        const m1Counters = card.counters['m1/m1'] || 0;
        const totalModification = p1Counters - m1Counters;
        const delta = type === 'p1/p1' ? amount : -amount;
        const newTotal = totalModification + (subtract ? -delta : delta);

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

      const newAmount = (card.counters[type] || 0) + (subtract ? -amount : amount);
      if (newAmount <= 0) {
        delete card.counters[type];
        return;
      }
      card.counters[type] = newAmount;
    });

    this.emitPlayerUpdate(player);
  }

  createToken(payload: CreateTokenPayload) {
    const { cardId, battlefieldPlayerId, name, position = { x: 50, y: 50 } } = payload;
    const player = this.getPlayerById(battlefieldPlayerId);

    const token: BattlefieldCard = {
      clashId: uniqid(),
      id: cardId,
      name,
      ownerId: player.id,
      isToken: true,
      manaValue: 0,
      position: Game.fixPosition(position),
    };

    player.zones.battlefield.push(token);

    this.emitPlayerUpdate(player);
  }

  copyCard(payload: CopyCardPayload) {
    const { amount, battlefieldPlayerId, clashId } = payload;

    const player = this.getPlayerById(battlefieldPlayerId);
    const originalCard = player.zones.battlefield.find(
      (card) => card.clashId === clashId
    )!;

    const offsetX = 1;
    const offsetY = 2;

    for (let i = 0; i < amount; i += 1) {
      const newPosition = {
        x: originalCard.position!.x + offsetX * (i + 1),
        y: originalCard.position!.y + offsetY * (i + 1),
      };
      const newCard: BattlefieldCard = {
        id: originalCard.id,
        clashId: uniqid(),
        name: originalCard.name,
        ownerId: originalCard.ownerId,
        manaValue: originalCard.manaValue,
        meta: {
          ...originalCard.meta,
          isCardCopy: !originalCard.isToken || originalCard.meta?.isCardCopy,
        },
        position: Game.fixPosition(newPosition),
        isToken: true,
      };
      player.zones.battlefield.push(newCard);
    }
    this.emitPlayerUpdate(player);
  }

  tapCards(payload: TapCardsPayload) {
    const { cardIds, battlefieldPlayerId, tapped: overwriteTapped } = payload;

    const player = this.getPlayerById(battlefieldPlayerId);

    const areAnyCardsUntapped = player.zones.battlefield.some(({ clashId, tapped }) => {
      return cardIds.includes(clashId) ? !tapped : false;
    });

    const tapped = overwriteTapped ?? areAnyCardsUntapped;

    player.zones.battlefield.forEach((card) => {
      if (!cardIds.includes(card.clashId)) return;
      card.tapped = tapped;
    });

    this.emitPlayerUpdate(player);
  }

  flipCards(payload: FlipCardsPayload) {
    const { cardIds, battlefieldPlayerId, flipped: overwriteFlipped } = payload;

    const player = this.getPlayerById(battlefieldPlayerId);

    player.zones.battlefield.forEach((card) => {
      if (!cardIds.includes(card.clashId)) return;
      card.flipped = overwriteFlipped ?? !card.flipped;
    });

    this.emitPlayerUpdate(player);
  }

  mill(socket: Socket, payload: MillPayload) {
    const { amount, playerId } = payload;
    const millingPlayer = this.getPlayerBySocket(socket);
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

  peek(socket: Socket, payload: PeekPayload) {
    const { amount, zone, playerId } = payload;
    const peekingPlayer = this.getPlayerBySocket(socket);
    const player = this.getPlayerById(playerId);

    const peekedCards = player.zones[zone].slice(-amount);

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

  endPeek(socket: Socket, payload: EndPeekPayload) {
    const peekingPlayer = this.getPlayerBySocket(socket);
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

  searchLibrary(socket: Socket, payload: SearchLibraryPayload) {
    const { playerId } = payload;
    const searchingPlayer = this.getPlayerBySocket(socket);
    const player = this.getPlayerById(playerId);

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

  shuffleLibrary(socket: Socket) {
    const player = this.getPlayerBySocket(socket);
    player.zones.library = randomizeArray(player.zones.library);

    this.emitPlayerUpdate(player);

    this.logAction({
      playerId: player.id,
      logKey: LOG_MESSAGES.SHUFFLE_LIBRARY,
      payload: {},
    });
  }

  sendChatMessage(socket: Socket, { message }: SendMessagePayload) {
    const player = this.getPlayerBySocket(socket);
    this.logAction({
      playerId: player.id,
      logKey: LOG_MESSAGES.CHAT_MESSAGE,
      payload: { message: message.slice(0, 1000) },
    });
  }

  setCommanderTimesCasted(socket: Socket, payload: SetCommanderTimesCastedPayload) {
    const player = this.getPlayerBySocket(socket);

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

  setPlayerLife(socket: Socket, payload: SetPlayerLifePayload) {
    const player = this.getPlayerBySocket(socket);

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

  endTurn(socket: Socket) {
    const player = this.getPlayerBySocket(socket);
    const { players, activePlayerId } = this.gameState;
    const activePlayerIndex = players.findIndex(({ id }) => id === activePlayerId);

    const newActivePlayerIndex = (activePlayerIndex + 1) % players.length;

    if (newActivePlayerIndex === 0) {
      this.gameState.turn += 1;
    }

    this.gameState.activePlayerId = players[newActivePlayerIndex].id;
    this.gameState.phase = 'beginning';

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

  setPhase(socket: Socket, payload: SetPhasePayload) {
    const player = this.getPlayerBySocket(socket);
    this.gameState.phase = payload.phase;

    const activePlayer = this.getPlayerById(this.gameState.activePlayerId);

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
}
