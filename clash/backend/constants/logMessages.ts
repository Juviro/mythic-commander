// eslint-disable-next-line import/no-cycle
import { Zone } from 'backend/database/gamestate.types';
import { SetCommanderTimesCastedPayload } from './wsEvents';

export const LOG_MESSAGES = {
  DRAW_CARD: 'DRAW_CARD',
  MOVE_CARD: 'MOVE_CARD',
  CHAT_MESSAGE: 'CHAT_MESSAGE',
  SET_COMMANDER_TIMES_CASTED: 'SET_COMMANDER_TIMES_CASTED',
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

export type LogPayloadSetCommanderTimesCasted = SetCommanderTimesCastedPayload & {
  commanderName: string;
};

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

interface LogMessageChat extends LogMessageWithPlayer {
  logKey: 'CHAT_MESSAGE';
  payload: string;
}

interface LogMessageSetCommanderTimesCasted extends LogMessageWithPlayer {
  logKey: 'SET_COMMANDER_TIMES_CASTED';
  payload: LogPayloadSetCommanderTimesCasted;
}

export type LogMessage =
  | LogMessageDraw
  | LogMessageMove
  | LogMessageChat
  | LogMessageSetCommanderTimesCasted;

export type GameLog = {
  timestamp: number;
} & LogMessage;
