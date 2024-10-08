enum DndItemTypes {
  CARD = 'CARD',
  LIST_CARD = 'LIST_CARD',
  CARD_GROUP = 'CARD_GROUP',
  MULLIGAN_CARD = 'MULLIGAN_CARD',
}

export type DndItemType = `${DndItemTypes}`;

export interface DropCard {
  clashId: string;
  ownerId?: string;
  tapped?: boolean;
}

export interface DropCardGroupOffset {
  x: number;
  y: number;
  width: number;
  height: number;
  isFlipped: boolean;
}

export interface DropCardGroup {
  battlefieldPlayerId: string;
  cardIds: string[];
  offset: DropCardGroupOffset;
}

export { DndItemTypes };
