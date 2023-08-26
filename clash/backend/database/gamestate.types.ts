interface HiddenCard {
  clashId: string;
}
interface VisibleCard {
  clashId: string;
  id: string;
  name: string;
}

export type Card = HiddenCard | VisibleCard;

type PositionedCard = Card & {
  x: number;
  y: number;
};

interface Zones {
  hand: Card[];
  library: Card[];
  exile: Card[];
  graveyard: Card[];
  commandZone: Card[];
  battlefield: PositionedCard[];
}

export interface Player {
  id: string;
  name: string;
  commanders: Card[];
  zones: Zones;
  life: number;
  isSelf?: boolean;
}

export interface GameState {
  gameId: string;
  players: Player[];
  turn: number;
  activePlayerId: string;
}
