export interface Card {
  id: string;
  name: string;
  clashId: string;
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
}

export interface GameState {
  players: Player[];
  turn: number;
  activePlayerId: string;
}
