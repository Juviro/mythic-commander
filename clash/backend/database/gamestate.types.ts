interface HiddenCard {
  clashId: string;
}
interface VisibleCardCard {
  clashId: string;
}

export type Card = HiddenCard | VisibleCardCard;

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
