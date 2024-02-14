type CardTypes =
  | 'Land'
  | 'Creature'
  | 'Artifact'
  | 'Enchantment'
  | 'Planeswalker'
  | 'Instant'
  | 'Sorcery'
  | 'Battle';

type BasicLandTypes = 'Plains' | 'Island' | 'Swamp' | 'Mountain' | 'Forest' | 'Wastes';

export const hasCardType = (typeLine: string, cardType: CardTypes) => {
  if (!typeLine) return false;
  const types = typeLine.split(' — ')[0].split(' ');
  return types.includes(cardType);
};

export const hasBasicLandType = (typeLine: string, basicLandType: BasicLandTypes) => {
  if (!typeLine) return false;
  const types = typeLine.split(' — ')[0].split(' ');
  return types.includes(basicLandType);
};

export const hasAnyBasicLandType = (typeLine: string) => {
  return typeLine?.match(/Plains|Island|Swamp|Mountain|Forest|Wastes/) !== null;
};
