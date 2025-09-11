/* eslint-disable import/no-cycle */
import { GameLog } from 'backend/constants/logMessages';
import { LobbyDeck, PlanechaseSet } from 'backend/lobby/GameLobby.types';
import { EmoteId } from 'components/lib/Emote/emoteIds';

export const PHASES = ['beginning', 'main1', 'combat', 'main2', 'end'] as const;

export type Phase = typeof PHASES[number];

// ##################### Card #####################
export interface HiddenCard {
  clashId: string;
  ownerId: string;
}

export interface RelatedCards {
  id: string;
  name: string;
  type: 'Token' | 'Emblem' | 'Dungeon' | 'Melded' | 'Meld Part';
}

export interface CardMeta {
  relatedCards?: RelatedCards[];
  isCardCopy?: boolean;
}

export type LayoutType =
  | 'token'
  | 'planar'
  | 'split'
  | 'mutate'
  | 'saga'
  | 'modal_dfc'
  | 'transform'
  | 'normal'
  | 'scheme'
  | 'adventure'
  | 'case'
  | 'meld'
  | 'emblem'
  | 'augment'
  | 'leveler'
  | 'prototype'
  | 'double_faced_token'
  | 'class'
  | 'reversible_card'
  | 'host'
  | 'flip'
  | 'vanguard';

export interface VisibleCard extends HiddenCard {
  clashId: string;
  id: string;
  name: string;
  transformable?: boolean;
  flippable?: boolean;
  layout?: LayoutType;
  meta?: CardMeta;
  manaValue: number;
  type_line: string;
  produced_mana?: string[];
  visibleTo?: string[];
}

export interface VisibleBattlefieldCard extends VisibleCard {
  tapped?: boolean;
  transformed?: boolean;
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

export interface FaceDownCard
  extends HiddenCard,
    Pick<VisibleBattlefieldCard, 'position' | 'counters' | 'tapped' | 'meta'> {
  faceDown: true;
  transformable?: false;
  flippable?: false;
  transformed?: false;
  isToken?: false;
  visibleTo?: string[];
  // these values are only set when the card is face down and visible to you
  name?: string;
  id?: string;
}

export interface Commander extends Omit<VisibleCard, 'ownerId' | 'position'> {
  commanderDamageDealt: {
    [playerId: string]: number;
  };
  timesCasted: number;
}

export type Card = HiddenCard | VisibleCard | VisibleBattlefieldCard | FaceDownCard;

export type BattlefieldCard = VisibleBattlefieldCard | FaceDownCard;

// ##################### Zone #####################
interface Zones {
  hand: Card[];
  library: Card[];
  exile: VisibleCard[];
  graveyard: VisibleCard[];
  commandZone: VisibleCard[];
  battlefield: BattlefieldCard[];
}

export const ZONES = {
  HAND: 'hand',
  LIBRARY: 'library',
  EXILE: 'exile',
  GRAVEYARD: 'graveyard',
  COMMAND_ZONE: 'commandZone',
  BATTLEFIELD: 'battlefield',
  STACK: 'stack',
} as const;

export type PlayerZone = keyof Zones;
export type Zone = typeof ZONES[keyof typeof ZONES];

// ##################### Player #####################

export interface FloatingManaValues {
  w?: number;
  u?: number;
  b?: number;
  r?: number;
  g?: number;
  c?: number;
}
export interface FloatingMana {
  mana: FloatingManaValues;
  visible?: boolean;
}

interface GameUtils {
  floatingMana?: FloatingMana;
}

interface AdditionalPlayerInfo {
  isFurryFriend?: boolean;
}

interface Mulligan {
  mulligansTaken: number;
  cardsAccepted: boolean;
}

interface RevealedCards {
  zone: PlayerZone;
  cards: VisibleCard[];
}

export interface PlayerRematchOptions {
  isReady: boolean;
  deck: LobbyDeck;
}

interface Emote {
  emote: EmoteId;
  timestamp: number;
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
  resigned?: boolean;
  activeUtils?: GameUtils;
  revealedCards?: RevealedCards;
  rematchOptions?: PlayerRematchOptions;
  playWithTopCardRevealed?: boolean;
  emote?: Emote;
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

export interface Stack {
  visible: boolean;
  cards: (VisibleCard | HiddenCard)[];
}

export interface HoveredCard {
  clashId: string;
  timestamp: number;
}

export interface ActivePlane {
  id: string;
  clashId: string;
  name: string;
  counters?: number;
  type_line: string;
  oracle_text: string;
  relatedCards?: RelatedCards[];
}

export type PlanarDiceResult = 'chaos' | 'planeswalk' | 'empty';

export interface PlanechaseState {
  planesDeck: { clashId: string }[];
  activePlane: ActivePlane;
  diceRollCost: number;
  lastDiceResult: PlanarDiceResult;
  lastDiceRollTimestamp: number;
}

export interface RematchOptions {
  isModalOpen: boolean;
  planechaseOptions?: PlanechaseSet[];
}

export interface GameState {
  hostId: string;
  gameId: string;
  players: Player[];
  turn: number;
  phase: Phase;
  activePlayerId: string;
  gameLog: GameLog[];
  resources?: Resources;
  winner?: string | null;
  stack: Stack;
  hoveredCards: { [playerId: string]: HoveredCard };
  phaseStopByPlayerId?: string | null;
  rematchOptions?: RematchOptions;
  planechase?: PlanechaseState;
}
