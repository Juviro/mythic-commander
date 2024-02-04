/* eslint-disable import/no-cycle */
import { GameLog } from 'backend/constants/logMessages';

export const PHASES = ['beginning', 'main1', 'combat', 'main2', 'end'] as const;

export type Phase = typeof PHASES[number];

// ##################### Card #####################
interface HiddenCard {
  clashId: string;
  ownerId: string;
}

export interface RelatedCards {
  id: string;
  name: string;
  type: 'Token' | 'Emblem' | 'Dungeon' | 'Melded';
}

export interface CardMeta {
  relatedCards?: RelatedCards[];
  isCardCopy?: boolean;
}

export interface VisibleCard extends HiddenCard {
  clashId: string;
  id: string;
  name: string;
  flippable?: boolean;
  meta?: CardMeta;
  manaValue: number;
}

export interface BattlefieldCard extends VisibleCard {
  tapped?: boolean;
  flipped?: boolean;
  faceDown?: boolean;
  isToken?: boolean;
  position?: {
    x: number;
    y: number;
  };
  counters?: {
    [key: string]: number;
  };
}

export interface FaceDownCard extends HiddenCard, Pick<BattlefieldCard, 'position'> {
  tapped?: boolean;
  faceDown?: boolean;
}

export interface Commander extends Omit<VisibleCard, 'ownerId' | 'position'> {
  commanderDamageDealt: {
    [playerId: string]: number;
  };
  timesCasted: number;
}

export type Card = HiddenCard | VisibleCard | BattlefieldCard;

// ##################### Zone #####################
interface Zones {
  hand: Card[];
  library: Card[];
  exile: VisibleCard[];
  graveyard: VisibleCard[];
  commandZone: VisibleCard[];
  battlefield: BattlefieldCard[];
}

export type Zone = keyof Zones;

export const ZONES = {
  HAND: 'hand',
  LIBRARY: 'library',
  EXILE: 'exile',
  GRAVEYARD: 'graveyard',
  COMMAND_ZONE: 'commandZone',
  BATTLEFIELD: 'battlefield',
} as const;

// ##################### Player #####################

interface AdditionalPlayerInfo {
  isFurryFriend?: boolean;
}

interface Mulligan {
  mulligansTaken: number;
  cardsAccepted: boolean;
}

export interface Player {
  id: string;
  name: string;
  color: string;
  commanders: Commander[];
  zones: Zones;
  life: number;
  additionalPlayerInfo?: AdditionalPlayerInfo;
  mulligan: Mulligan;
}

// ##################### Meta #####################

export interface TokenOption {
  ids: string[];
  name: string;
  powerToughness: string;
  colors: string;
  oracle_text: string;
  layout: 'token' | 'emblem';
}

export interface Resources {
  tokens: TokenOption[];
}

// ##################### GameState #####################

export interface GameState {
  hostId: string;
  gameId: string;
  players: Player[];
  turn: number;
  phase: Phase;
  activePlayerId: string;
  gameLog: GameLog[];
  resources?: Resources;
}
