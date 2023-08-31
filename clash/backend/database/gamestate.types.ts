import { GameLog } from 'backend/constants/logMessages';

interface HiddenCard {
  clashId: string;
}
export interface VisibleCard extends HiddenCard {
  clashId: string;
  id: string;
  name: string;
  ownerId?: string;
  position?: {
    x: number;
    y: number;
  };
}

export type Card = HiddenCard | VisibleCard;

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

export interface Player {
  id: string;
  name: string;
  color: string;
  commanders: Card[];
  zones: Zones;
  life: number;
}

export interface GameState {
  gameId: string;
  players: Player[];
  turn: number;
  activePlayerId: string;
  gameLog: GameLog[];
}
