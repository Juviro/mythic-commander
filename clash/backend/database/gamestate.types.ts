// eslint-disable-next-line import/no-cycle
import { GameLog } from 'backend/constants/logMessages';

export const PHASES = ['beginning', 'main1', 'combat', 'main2', 'end'] as const;

export type Phase = typeof PHASES[number];

// ##################### Card #####################
interface HiddenCard {
  clashId: string;
  ownerId: string;
}
export interface VisibleCard extends HiddenCard {
  clashId: string;
  id: string;
  name: string;
  flippable?: boolean;
}
export interface BattlefieldCard extends VisibleCard {
  tapped?: boolean;
  position?: {
    x: number;
    y: number;
  };
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
export interface Player {
  id: string;
  name: string;
  color: string;
  commanders: Commander[];
  zones: Zones;
  life: number;
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
}
