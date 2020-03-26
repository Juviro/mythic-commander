export default cards => {
  if (!cards) return null;
  return cards.map(({ createdAt, amount, zone, card: coreFields }) => {
    const card = { ...coreFields };
    if (zone !== undefined) card.zone = zone;
    if (amount !== undefined) card.amount = amount;
    if (createdAt !== undefined) card.createdAt = createdAt;
    return card;
  });
};
