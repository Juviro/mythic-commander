export interface Card {
  id: string;
  name: string;
  clashId: string; // unique id for each card
}

export type Commander = Omit<Card, 'clashId'>;

interface Zones {
  hand: Card[];
  library: Card[];
  exile: Card[];
  graveyard: Card[];
  commandZone: Commander[];
}

export interface Player {
  id: string;
  name: string;
  commanders: Commander[];
  zones: Zones;
  life: number;
}

export interface GameState {
  gameId: string;
  players: Player[];
  turn: number;
  activePlayerId: string;
}
