import { Socket } from 'socket.io';
import type Game from './Game';
import { SOCKET_MSG_GAME } from 'backend/constants/wsEvents';
import { GameState, Player } from 'backend/database/gamestate.types';
import { obfuscatePlanechase, obfuscatePlayer, obfuscateStack } from './utils/gameUtils';

export function emitToAll(game: Game, msg: string, data: any) {
  game.server.to(game.id).emit(msg, data);
}

export function emitGameState(game: Game, socket: Socket, playerId: string) {
  socket.emit(SOCKET_MSG_GAME.GAME_STATE, game.obfuscateGameState(playerId));

  if (game.requestedStopPoints[playerId]) {
    socket.emit(SOCKET_MSG_GAME.SET_STOP_POINT, {
      phase: game.requestedStopPoints[playerId],
    });
  }
}

export function emitGameStateToAll(game: Game) {
  game.gameState.players.forEach(({ id }) => {
    const user = game.users[id];
    if (!user) return;
    emitGameState(game, user.socket, id);
  });
}

export function emitGameUpdate(game: Game, emittedFields?: (keyof GameState)[]) {
  const { activePlayerId, phase, turn, winner, phaseStopByPlayerId, stack, rematchOptions, hoveredCards, planechase } =
    game.gameState;

  const emittedGameState: Partial<GameState> = {
    activePlayerId,
    phase,
    turn,
    winner,
    phaseStopByPlayerId,
    rematchOptions,
    hoveredCards,
    stack: obfuscateStack(stack),
    planechase: obfuscatePlanechase(planechase),
  };

  if (emittedFields) {
    Object.keys(emittedGameState).forEach((key) => {
      if (!emittedFields.includes(key as keyof GameState)) {
        delete emittedGameState[key as keyof GameState];
      }
    });
  }

  emitToAll(game, SOCKET_MSG_GAME.GAME_STATE, emittedGameState);
  game.gameState.phaseStopByPlayerId = null;
}

export function emitPlayerUpdate(game: Game, player: Player) {
  game.gameState.players.forEach(({ id: playerId }) => {
    const obfuscatedGameState = obfuscatePlayer(player, playerId);
    const socketId = game.users[playerId]?.socket.id;
    if (!socketId) return;

    game.server.to(socketId).emit(SOCKET_MSG_GAME.UPDATE_PLAYER, obfuscatedGameState);
  });
}

export function join(game: Game, socket: Socket, user: { id: string; username: string }) {
  game.users[user.id] = {
    name: user.username,
    socket,
  } as any;

  socket.join(game.id);
  emitGameState(game, socket, user.id);
}


