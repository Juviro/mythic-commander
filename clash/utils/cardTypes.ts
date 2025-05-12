/* eslint-disable import/no-cycle */
import {
  ActivePlane,
  BattlefieldCard,
  VisibleCard,
} from 'backend/database/gamestate.types';

export type PermanentCardType =
  | 'Land'
  | 'Creature'
  | 'Planeswalker'
  | 'Artifact'
  | 'Enchantment'
  | 'Battle';

type CardTypes =
  | PermanentCardType
  | 'Instant'
  | 'Sorcery'
  | 'Phenomenon'
  | 'Room'
  | 'Plane';

type BasicLandTypes = 'Plains' | 'Island' | 'Swamp' | 'Mountain' | 'Forest' | 'Wastes';

export const hasCardType = (typeLine: string, cardType: CardTypes) => {
  if (!typeLine) return false;
  const types = typeLine.split(' — ')[0].split(' ');
  return types.includes(cardType);
};

export const hasCardSubType = (typeLine: string, subType: string) => {
  if (!typeLine) return false;
  const types = typeLine.split(' — ')[1]?.split(' ');
  return types?.includes(subType);
};

export const hasBasicLandType = (typeLine: string, basicLandType: BasicLandTypes) => {
  if (!typeLine) return false;
  const types = typeLine.split(' — ')[0].split(' ');
  return types.includes(basicLandType);
};

export const hasAnyBasicLandType = (typeLine: string) => {
  return typeLine?.match(/Plains|Island|Swamp|Mountain|Forest|Wastes/) !== null;
};

export const getCardRotation = (card: VisibleCard | BattlefieldCard | ActivePlane) => {
  if (!('type_line' in card) || !card.type_line) return 0;

  if ('transformed' in card && card.transformed) {
    return 0;
  }

  if ('flipped' in card && card.flipped) {
    return 180;
  }

  if ('layout' in card && card.layout === 'split') {
    return 90;
  }

  if (hasCardType(card.type_line, 'Battle')) {
    return 90;
  }

  if (hasCardType(card.type_line, 'Plane')) {
    return 90;
  }

  if (hasCardType(card.type_line, 'Phenomenon')) {
    return 90;
  }

  if (hasCardSubType(card.type_line, 'Room')) {
    return 90;
  }

  return 0;
};
