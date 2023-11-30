// eslint-disable-next-line import/no-cycle
import { Phase, Zone } from 'backend/database/gamestate.types';

export const SOCKET_MSG_GENERAL = {
  ERROR: 'error',
  NOT_LOGGED_IN: 'not_logged_in',
};

export const SOCKET_MSG_LOBBY = {
  INITIALIZE: 'initialize_lobby',
  HOST_LOBBY: 'host_lobby',
  UPDATE_LOBBIES: 'update_lobbies',
  JOIN_LOBBY: 'join_lobby',
  LEAVE_LOBBY: 'leave_lobby',
  SELECT_DECK: 'select_deck',
  SELECT_COLOR: 'select_color',
  READY: 'ready',
  START_MATCH: 'start_match',
};

export const SOCKET_MSG_GAME = {
  INITIALIZE: 'initialize_game',
  GAME_STATE: 'game_state',
  UPDATE_PLAYER: 'update_player',
  GAME_LOG: 'game_log',
  SEND_CHAT_MESSAGE: 'send_chat_message',
  SET_PHASE: 'set_phase',
  END_TURN: 'end_turn',

  DRAW_CARD: 'draw_card',
  MOVE_CARD: 'move_card',

  SET_COMMANDER_TIMES_CASTED: 'set_commander_times_casted',
  SET_PLAYER_LIFE: 'set_player_life',
};

export interface MoveCardDetails {
  position?: { x: number; y: number };
  index?: number;
}

export interface MoveCardPayload extends MoveCardDetails {
  clashId: string;
  to: {
    zone: Zone;
    playerId: string;
  };
}

export interface SendMessagePayload {
  message: string;
}

export interface SetCommanderTimesCastedPayload {
  commanderClashId: string;
  total: number;
}

export interface SetPlayerLifePayload {
  forPlayerId: string;
  total: number;
}

export interface SetPhasePayload {
  phase: Phase;
}
