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
  CREATE_TOKEN: 'CREATE_TOKEN',
  COPY_CARD: 'COPY_CARD',
  ADD_COUNTERS: 'ADD_COUNTERS',
  TURN_FACE_DOWN: 'TURN_FACE_DOWN',
  PEEK_FACE_DOWN: 'PEEK_FACE_DOWN',
  PLAY_TOP_CARD_FACE_DOWN: 'PLAY_TOP_CARD_FACE_DOWN',

  CHAT_MESSAGE: 'CHAT_MESSAGE',
  EXECUTE_COMMAND: 'EXECUTE_COMMAND',
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

interface RollDiceLogPayload {
  command: 'roll';
  sides: number;
  numberOfDice: number;
  results: number[];
}

interface FlipCoinLogPayload {
  command: 'flip';
  numberOfCoins: number;
  numberOfWonFlips: number;
}

export type LogPayloadExecuteCommand = RollDiceLogPayload | FlipCoinLogPayload;

export interface LogPayloadCreateToken {
  cardName: string;
  battlefieldPlayerId: string;
}
export interface LogPayloadCopyCard {
  amount: number;
  cardName: string;
  battlefieldPlayerId: string;
}

export interface LogPayloadAddCounters {
  amount: number;
  cardNames: string[];
  cardIds: string[];
  battlefieldPlayerId: string;
  type: string;
}

export interface LogPayloadTurnFaceDown {
  cardNames: string[];
  battlefieldPlayerId: string;
  faceDown: boolean;
}

export interface LogPayloadPeekFaceDown {
  clashId: string;
  battlefieldPlayerId: string;
}

export interface LogPayloadPlayTopCardFaceDown {
  libraryPlayerId: string;
}

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

interface LogExecuteCommand extends LogMessageWithPlayer {
  logKey: 'EXECUTE_COMMAND';
  payload: LogPayloadExecuteCommand;
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

interface LogMessageCreateToken extends LogMessageWithPlayer {
  logKey: 'CREATE_TOKEN';
  payload: LogPayloadCreateToken;
}

interface LogMessageCopyCard extends LogMessageWithPlayer {
  logKey: 'COPY_CARD';
  payload: LogPayloadCopyCard;
}

interface LogMessageAddCounters extends LogMessageWithPlayer {
  logKey: 'ADD_COUNTERS';
  payload: LogPayloadAddCounters;
}

interface LogMessageTurnFaceDown extends LogMessageWithPlayer {
  logKey: 'TURN_FACE_DOWN';
  payload: LogPayloadTurnFaceDown;
}

interface LogMessagePeekFaceDown extends LogMessageWithPlayer {
  logKey: 'PEEK_FACE_DOWN';
  payload: LogPayloadPeekFaceDown;
}

interface LogMessagePlayTopCardFaceDown extends LogMessageWithPlayer {
  logKey: 'PLAY_TOP_CARD_FACE_DOWN';
  payload: LogPayloadPlayTopCardFaceDown;
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
  | LogExecuteCommand
  | LogMessageSetPlayerLife
  | LogMessageSetCommanderTimesCasted
  | LogMessageSetPhase
  | LogMessageSetActivePlayer
  | LogMessageCreateToken
  | LogMessageCopyCard
  | LogMessageAddCounters
  | LogMessageTurnFaceDown
  | LogMessagePeekFaceDown
  | LogMessagePlayTopCardFaceDown;

export type GameLog = {
  timestamp: number;
  overwritesPreviousLog?: boolean;
} & LogMessage;
