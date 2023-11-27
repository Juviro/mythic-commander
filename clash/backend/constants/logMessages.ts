// eslint-disable-next-line import/no-cycle
import { Zone } from 'backend/database/gamestate.types';

export const LOG_MESSAGES = {
  DRAW_CARD: 'DRAW_CARD',
  MOVE_CARD: 'MOVE_CARD',
} as const;

interface MoveCardLocation {
  zone: Zone;
  playerName: string;
}
export interface LogPlayoadMoveZone {
  cardName: string;
  from: MoveCardLocation;
  to: MoveCardLocation;
}

export interface LogPayloadDraw {
  amount: number;
}

export type LogPayload = LogPayloadDraw | LogPlayoadMoveZone;

export type LogKey = typeof LOG_MESSAGES[keyof typeof LOG_MESSAGES];

interface LogMessageWithPlayer {
  playerId: string;
}

interface LogMessageDraw extends LogMessageWithPlayer {
  logKey: 'DRAW_CARD';
  payload: LogPayloadDraw;
}

interface LogMessageMove extends LogMessageWithPlayer {
  logKey: 'MOVE_CARD';
  payload: LogPlayoadMoveZone;
}

export type LogMessage = LogMessageDraw | LogMessageMove;

export type GameLog = {
  timestamp: number;
} & LogMessage;
