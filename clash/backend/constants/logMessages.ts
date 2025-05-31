// eslint-disable-next-line import/no-cycle
import { PlanarDiceResult, Zone } from 'backend/database/gamestate.types';
import {
  SendMessagePayload,
  SetCommanderDamagePayload,
  SetCommanderTimesCastedPayload,
  SetPhasePayload,
  SetPlayerLifePayload,
} from './wsEvents';

export const LOG_MESSAGES = {
  PLAYER_DEFEATED: 'PLAYER_DEFEATED',
  ACCEPT_HAND: 'ACCEPT_HAND',
  TAKE_MULLIGAN: 'TAKE_MULLIGAN',
  DRAW_CARD: 'DRAW_CARD',
  MOVE_CARDS: 'MOVE_CARDS',
  DISCARD_RANDOM_CARD: 'DISCARD_RANDOM_CARD',
  RETURN_RANDOM_CARD_FROM_GRAVEYARD: 'RETURN_RANDOM_CARD_FROM_GRAVEYARD',
  PEEK: 'PEEK',
  REVEAL_CARDS_FROM_HAND: 'REVEAL_CARDS_FROM_HAND',
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
  SET_COMMANDER_DAMAGE: 'SET_COMMANDER_DAMAGE',
  SET_PHASE: 'SET_PHASE',
  SET_ACTIVE_PLAYER: 'SET_ACTIVE_PLAYER',

  ROLL_PLANAR_DICE: 'ROLL_PLANAR_DICE',
  PLANESWALK: 'PLANESWALK',
  UNDO: 'UNDO',
} as const;

export const UNDOABLE_LOG_MESSAGES: typeof LOG_MESSAGES[keyof typeof LOG_MESSAGES][] = [
  LOG_MESSAGES.PLAYER_DEFEATED,
  LOG_MESSAGES.DRAW_CARD,
  LOG_MESSAGES.MOVE_CARDS,
  LOG_MESSAGES.DISCARD_RANDOM_CARD,
  LOG_MESSAGES.RETURN_RANDOM_CARD_FROM_GRAVEYARD,
  LOG_MESSAGES.MILL,
  LOG_MESSAGES.SHUFFLE_LIBRARY,
  LOG_MESSAGES.CREATE_TOKEN,
  LOG_MESSAGES.COPY_CARD,
  LOG_MESSAGES.ADD_COUNTERS,
  LOG_MESSAGES.TURN_FACE_DOWN,
  LOG_MESSAGES.PLAY_TOP_CARD_FACE_DOWN,
  LOG_MESSAGES.SET_PHASE,
  LOG_MESSAGES.SET_ACTIVE_PLAYER,
  LOG_MESSAGES.ROLL_PLANAR_DICE,
  LOG_MESSAGES.PLANESWALK,
];

export type LogKey = typeof LOG_MESSAGES[keyof typeof LOG_MESSAGES];

// ############################### Payloads ###############################
interface MoveCardLocation {
  zone: Zone;
  playerId: string;
  libraryPosition?: 'top' | 'bottom' | number | null;
}

export interface LogPayloadMoveZone {
  cardNames: (string | null)[];
  from: MoveCardLocation;
  to: MoveCardLocation;
}

export interface LogPayloadDiscardRandomCard {
  cardName: string;
}

export interface LogPayloadReturnRandomCardFromGraveyard {
  cardName: string;
}

export interface LogPayloadMill {
  amount: number;
  peekedPlayerId: string;
}

export interface LogPayloadPeek {
  peekedPlayerId: string;
  amount: number;
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

export type LogPayloadSetCommanderDamage = SetCommanderDamagePayload & {
  fromPlayerId: string;
  previousTotal: number;
  commanderName: string;
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
  battlefieldPlayerId: string | null;
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

export interface LogPayloadRollPlanarDice {
  result: PlanarDiceResult;
}

export interface LogPayloadPlaneswalk {
  newPlaneName: string;
  oldPlaneText?: string;
}

export interface LogPayloadUndo {
  numberOfUndos: number;
}

export interface LogPayloadRevealCardsFromHand {
  amount: number;
  toPlayerIds: string[];
  didRevealAllCards?: boolean;
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
  logKey: 'MOVE_CARDS';
  payload: LogPayloadMoveZone;
}

interface LogMessageDiscardRandomCard extends LogMessageWithPlayer {
  logKey: 'DISCARD_RANDOM_CARD';
  payload: LogPayloadDiscardRandomCard;
}

export interface LogMessageReturnRandomCardFromGraveyard extends LogMessageWithPlayer {
  logKey: 'RETURN_RANDOM_CARD_FROM_GRAVEYARD';
  payload: LogPayloadReturnRandomCardFromGraveyard;
}

interface LogPeek extends LogMessageWithPlayer {
  logKey: 'PEEK';
  payload: LogPayloadPeek;
}

interface LogMessageRevealCardsFromHand extends LogMessageWithPlayer {
  logKey: 'REVEAL_CARDS_FROM_HAND';
  payload: LogPayloadRevealCardsFromHand;
}

interface LogMill extends LogMessageWithPlayer {
  logKey: 'MILL';
  payload: LogPayloadMill;
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

interface LogMessageSetCommanderDamage extends LogMessageWithPlayer {
  logKey: 'SET_COMMANDER_DAMAGE';
  payload: LogPayloadSetCommanderDamage;
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

interface LogMessageRollPlanarDice extends LogMessageWithPlayer {
  logKey: 'ROLL_PLANAR_DICE';
  payload: LogPayloadRollPlanarDice;
}

interface LogMessagePlaneswalk extends LogMessageWithPlayer {
  logKey: 'PLANESWALK';
  payload: LogPayloadPlaneswalk;
}

interface LogMessageUndo extends LogMessageWithPlayer {
  logKey: 'UNDO';
  payload: LogPayloadUndo;
}

// ############################### Log ###############################

export type LogMessage =
  | LogMessagePlayerDefeated
  | LogMessageAcceptHand
  | LogMessageTakeMulligan
  | LogMessageDraw
  | LogMessageMove
  | LogMessageDiscardRandomCard
  | LogMessageReturnRandomCardFromGraveyard
  | LogPeek
  | LogMessageRevealCardsFromHand
  | LogMill
  | LogEndPeek
  | LogSearchLibrary
  | LogShuffleLibrary
  | LogMessageChat
  | LogExecuteCommand
  | LogMessageSetPlayerLife
  | LogMessageSetCommanderDamage
  | LogMessageSetCommanderTimesCasted
  | LogMessageSetPhase
  | LogMessageSetActivePlayer
  | LogMessageCreateToken
  | LogMessageCopyCard
  | LogMessageAddCounters
  | LogMessageTurnFaceDown
  | LogMessagePeekFaceDown
  | LogMessagePlayTopCardFaceDown
  | LogMessageRollPlanarDice
  | LogMessagePlaneswalk
  | LogMessageUndo;

export type GameLog = {
  timestamp: number;
  overwritesPreviousLog?: boolean;
  undoId?: string;
} & LogMessage;
