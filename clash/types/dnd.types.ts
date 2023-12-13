enum DndItemTypes {
  CARD = 'CARD',
  LIST_CARD = 'LIST_CARD',
  CARD_GROUP = 'CARD_GROUP',
}

export interface DropCard {
  clashId: string;
  ownerId?: string;
}

export interface DropCardGroup {
  cardIds: string[];
  offset: { x: number; y: number };
}

export { DndItemTypes };
