export const isCardLegal = (card, commander) => {
  const { color_identity, legalities } = card;
  const isLegal = !legalities.commander || legalities.commander === 'legal';
  if (!commander) return isLegal;

  const rightColorIdentity =
    !color_identity ||
    color_identity.every(color => commander.color_identity.includes(color));

  return rightColorIdentity && isLegal;
};

export const isDeckLegal = ({ cards = [] }) => {
  const commander = cards.find(({ zone }) => zone === 'COMMANDER');

  return cards.every(card => isCardLegal(card, commander));
};

export const isDeckOwned = ({ cards = [] }) => {
  return cards.every(({ owned }) => owned);
};

export const getImageUris = card => {
  return card.image_uris ? card.image_uris : card.card_faces[0].image_uris;
};

export const getPrice = ({ prices: { usd, usd_foil } }) => {
  const price = usd || usd_foil;
  return Number(price) || 0;
};

export const getPriceLabel = amountInUsd => {
  const formatPrice = amount =>
    Number(amount).toLocaleString('de-DE', {
      style: 'currency',
      maximumFractionDigits: 2,
      minimumFractionDigits: 2,
      currency: 'USD',
    });

  return amountInUsd ? formatPrice(amountInUsd) : '-';
};
