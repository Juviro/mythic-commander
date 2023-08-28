export const LOG_MESSAGES = {
  DRAW_CARD: 'DRAW_CARD',
} as const;

interface LogPayloadDraw {
  amount: number;
}

interface LogPlayoadMoveZone {
  cardId: string;
  from: string;
  to: string;
}

export type LogPayload = LogPayloadDraw | LogPlayoadMoveZone;

export type LogKey = typeof LOG_MESSAGES[keyof typeof LOG_MESSAGES];

export interface GameLog {
  playerId?: string;
  timestamp: number;
  logKey: LogKey;
  payload?: LogPayload;
}
