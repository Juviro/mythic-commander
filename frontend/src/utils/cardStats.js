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
