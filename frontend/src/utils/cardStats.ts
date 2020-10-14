import { UnifiedCard, UnifiedDeckCard } from 'types/unifiedTypes';

export const isCardLegal = (card: UnifiedCard, commander: UnifiedCard) => {
  const { color_identity, isCommanderLegal } = card;
  if (!commander) return isCommanderLegal;

  const rightColorIdentity =
    !color_identity ||
    color_identity.every((color) => commander.color_identity.includes(color));

  return rightColorIdentity && isCommanderLegal;
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

export const getPrice = ({ prices: { usd, usd_foil } }: UnifiedCard) => {
  const price = usd || usd_foil;
  return Number(price) || 0;
};

export const getPriceLabel = (amountInUsd: string | number, { round = false } = {}) => {
  const parsedAmount = Number(amountInUsd);
  const isLong = parsedAmount >= 1000;
  const numberOfDigits = round || isLong ? 0 : 2;

  const formatPrice = (amount: string | number) =>
    Number(amount).toLocaleString('de-DE', {
      style: 'currency',
      maximumFractionDigits: numberOfDigits,
      minimumFractionDigits: numberOfDigits,
      currency: 'USD',
    });

  return parsedAmount ? formatPrice(parsedAmount) : '-';
};
