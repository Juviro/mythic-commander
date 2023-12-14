enum DndItemTypes {
  CARD = 'CARD',
  LIST_CARD = 'LIST_CARD',
  CARD_GROUP = 'CARD_GROUP',
}

export interface DropCard {
  clashId: string;
  ownerId?: string;
}

export interface DropCardGroupOffset {
  x: number;
  y: number;
  width: number;
  height: number;
  isFlipped: boolean;
}

export interface DropCardGroup {
  cardIds: string[];
  offset: DropCardGroupOffset;
}

export { DndItemTypes };
