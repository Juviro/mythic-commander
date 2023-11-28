// eslint-disable-next-line import/no-cycle
import { GameLog } from 'backend/constants/logMessages';

// ##################### Card #####################
interface HiddenCard {
  clashId: string;
  ownerId: string;
}
export interface VisibleCard extends HiddenCard {
  clashId: string;
  id: string;
  name: string;
  position?: {
    x: number;
    y: number;
  };
}

export interface Commander extends Omit<VisibleCard, 'ownerId'> {
  commanderDamageDealt: {
    [playerId: string]: number;
  };
  timesCasted: number;
}

export type Card = HiddenCard | VisibleCard;

// ##################### Zone #####################
interface Zones {
  hand: Card[];
  library: Card[];
  exile: Card[];
  graveyard: Card[];
  commandZone: Card[];
  battlefield: VisibleCard[];
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
  gameId: string;
  players: Player[];
  turn: number;
  activePlayerId: string;
  gameLog: GameLog[];
}
