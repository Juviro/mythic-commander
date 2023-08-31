export const LOG_MESSAGES = {
  DRAW_CARD: 'DRAW_CARD',
  MOVE_CARD: 'MOVE_CARD',
} as const;

interface LogPayloadDraw {
  amount: number;
}

interface MoveCardLocation {
  zone: string;
  playerName: string;
}
interface LogPlayoadMoveZone {
  cardName: string;
  from: MoveCardLocation;
  to: MoveCardLocation;
}

export type LogPayload = LogPayloadDraw | LogPlayoadMoveZone;

export type LogKey = typeof LOG_MESSAGES[keyof typeof LOG_MESSAGES];

export interface GameLog {
  playerId?: string;
  timestamp: number;
  logKey: LogKey;
  payload?: LogPayload;
}
