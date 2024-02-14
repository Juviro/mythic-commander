// eslint-disable-next-line import/no-cycle
import { Zone } from 'backend/database/gamestate.types';
import {
  SendMessagePayload,
  SetCommanderTimesCastedPayload,
  SetPhasePayload,
  SetPlayerLifePayload,
} from './wsEvents';

export const LOG_MESSAGES = {
  PLAYER_DEFEATED: 'PLAYER_DEFEATED',
  ACCEPT_HAND: 'ACCEPT_HAND',
  TAKE_MULLIGAN: 'TAKE_MULLIGAN',
  DRAW_CARD: 'DRAW_CARD',
  MOVE_CARD: 'MOVE_CARD',
  DISCARD_RANDOM_CARD: 'DISCARD_RANDOM_CARD',
  PEEK: 'PEEK',
  MILL: 'MILL',
  END_PEEK: 'END_PEEK',
  SEARCH_LIBRARY: 'SEARCH_LIBRARY',
  SHUFFLE_LIBRARY: 'SHUFFLE_LIBRARY',

  CHAT_MESSAGE: 'CHAT_MESSAGE',
  SET_COMMANDER_TIMES_CASTED: 'SET_COMMANDER_TIMES_CASTED',
  SET_LIFE: 'SET_LIFE',
  SET_PHASE: 'SET_PHASE',
  SET_ACTIVE_PLAYER: 'SET_ACTIVE_PLAYER',
} as const;

export type LogKey = typeof LOG_MESSAGES[keyof typeof LOG_MESSAGES];

// ############################### Payloads ###############################
interface MoveCardLocation {
  zone: Zone;
  playerId: string;
  libraryPosition?: 'top' | 'bottom' | number | null;
}

export interface LogPayloadMoveZone {
  cardName: string | null;
  from: MoveCardLocation;
  to: MoveCardLocation;
}

export interface LogPayloadDiscardRandomCard {
  cardName: string;
}

export interface LogPayloadMill {
  amount: number;
  peekedPlayerId: string;
}

export interface LogPayloadPeek {
  amount: number;
  peekedPlayerId: string;
  zone: Zone;
}

export interface LogPayloadEndPeek {
  playerId: string;
  amountToBottom: number;
  amountToTop: number;
  shuffleLibrary: boolean;
  randomizeBottomCards: boolean;
}

export interface LogPayloadSearchLibrary {
  libraryPlayerId: string;
}

export interface LogPayloadAcceptHand {
  cardsKept: number;
}

export interface LogPayloadMulligan {
  mulligansTaken: number;
}

export interface LogPayloadDraw {
  amount: number;
}

export type LogPayloadSetCommanderTimesCasted = SetCommanderTimesCastedPayload & {
  commanderName: string;
  previousTotal: number;
};

export type LogPayloadSetPlayerLife = SetPlayerLifePayload & {
  fromPlayerId: string;
  previousTotal: number;
};

export type LogPayloadSetPhase = SetPhasePayload & {
  activePlayerId: string;
};

export type LogPayloadSetActivePlayer = {
  activePlayerId: string;
};

// ############################### Messages ###############################

interface LogMessageWithPlayer {
  playerId: string;
}

interface LogMessagePlayerDefeated extends LogMessageWithPlayer {
  logKey: 'PLAYER_DEFEATED';
  payload: Record<string, never>;
}

interface LogMessageAcceptHand extends LogMessageWithPlayer {
  logKey: 'ACCEPT_HAND';
  payload: LogPayloadAcceptHand;
}

interface LogMessageTakeMulligan extends LogMessageWithPlayer {
  logKey: 'TAKE_MULLIGAN';
  payload: LogPayloadMulligan;
}

interface LogMessageDraw extends LogMessageWithPlayer {
  logKey: 'DRAW_CARD';
  payload: LogPayloadDraw;
}

interface LogMessageMove extends LogMessageWithPlayer {
  logKey: 'MOVE_CARD';
  payload: LogPayloadMoveZone;
}

interface LogMessageDiscardRandomCard extends LogMessageWithPlayer {
  logKey: 'DISCARD_RANDOM_CARD';
  payload: LogPayloadDiscardRandomCard;
}

interface LogMill extends LogMessageWithPlayer {
  logKey: 'MILL';
  payload: LogPayloadMill;
}

interface LogPeek extends LogMessageWithPlayer {
  logKey: 'PEEK';
  payload: LogPayloadPeek;
}

interface LogEndPeek extends LogMessageWithPlayer {
  logKey: 'END_PEEK';
  payload: LogPayloadEndPeek;
}

interface LogSearchLibrary extends LogMessageWithPlayer {
  logKey: 'SEARCH_LIBRARY';
  payload: LogPayloadSearchLibrary;
}

interface LogShuffleLibrary extends LogMessageWithPlayer {
  logKey: 'SHUFFLE_LIBRARY';
  payload: Record<string, never>;
}

interface LogMessageChat extends LogMessageWithPlayer {
  logKey: 'CHAT_MESSAGE';
  payload: SendMessagePayload;
}

interface LogMessageSetCommanderTimesCasted extends LogMessageWithPlayer {
  logKey: 'SET_COMMANDER_TIMES_CASTED';
  payload: LogPayloadSetCommanderTimesCasted;
}

interface LogMessageSetPlayerLife extends LogMessageWithPlayer {
  logKey: 'SET_LIFE';
  payload: LogPayloadSetPlayerLife;
}

interface LogMessageSetPhase extends LogMessageWithPlayer {
  logKey: 'SET_PHASE';
  payload: LogPayloadSetPhase;
}

interface LogMessageSetActivePlayer extends LogMessageWithPlayer {
  logKey: 'SET_ACTIVE_PLAYER';
  payload: LogPayloadSetActivePlayer;
}

// ############################### Log ###############################

export type LogMessage =
  | LogMessagePlayerDefeated
  | LogMessageAcceptHand
  | LogMessageTakeMulligan
  | LogMessageDraw
  | LogMessageMove
  | LogMessageDiscardRandomCard
  | LogMill
  | LogPeek
  | LogEndPeek
  | LogSearchLibrary
  | LogShuffleLibrary
  | LogMessageChat
  | LogMessageSetPlayerLife
  | LogMessageSetCommanderTimesCasted
  | LogMessageSetPhase
  | LogMessageSetActivePlayer;

export type GameLog = {
  timestamp: number;
  overwritesPreviousLog?: boolean;
} & LogMessage;
