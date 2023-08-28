export const LOG_MESSAGES = {
  DRAW_CARD: 'DRAW_CARD',
} as const;

interface LogPayloadDraw {
  amount: number;
}
export type LogPayload = LogPayloadDraw;

export type LogKey = typeof LOG_MESSAGES[keyof typeof LOG_MESSAGES];

export interface GameLog {
  playerId?: string;
  timestamp: number;
  logKey: LogKey;
  payload?: LogPayload;
}
