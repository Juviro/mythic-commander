import { UnifiedCard, UnifiedDeckCard } from 'types/unifiedTypes';

export const hasCorrectColorIdentity = (card: UnifiedCard, commander: UnifiedCard) => {
  const { color_identity } = card;
  return (
    !color_identity ||
    color_identity.every((color) => commander.color_identity.includes(color))
  );
};

export const isCardLegal = (card: UnifiedCard, commander: UnifiedCard) => {
  const { isCommanderLegal } = card;
  if (!commander) return isCommanderLegal;

  const correctColorIdentity = hasCorrectColorIdentity(card, commander);

  return correctColorIdentity && isCommanderLegal;
};

export const isDeckLegal = ({ cards = [] }: { cards: UnifiedDeckCard[] }) => {
  const commander = cards.find(({ isCommander }) => isCommander);

  return cards.every((card) => isCardLegal(card, commander));
};

export const isDeckOwned = ({ cards = [] }: { cards: UnifiedCard[] }) => {
  return cards.every(({ owned }) => owned);
};

export const getImageUris = (card: UnifiedCard) => {
  return card.image_uris ? card.image_uris : card.card_faces[0].image_uris;
};

export const getPriceLabel = (
  passedAmount: string | number,
  { round = false, currency = 'USD' } = {}
) => {
  const parsedAmount = Number(passedAmount);
  if (!parsedAmount) return '-';

  const isLong = parsedAmount >= 100;
  const numberOfDigits = round || isLong ? 0 : 2;

  const usedAmount = round && parsedAmount < 1 ? 1 : parsedAmount;

  return Number(usedAmount).toLocaleString('de-DE', {
    style: 'currency',
    maximumFractionDigits: numberOfDigits,
    minimumFractionDigits: numberOfDigits,
    currency,
  });
};
