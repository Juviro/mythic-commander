export const unifySingleCard = ({ oracleCard, ...coreFields }) => ({
  ...oracleCard,
  ...coreFields,
});

export default cards => {
  if (!cards) return null;
  return cards.map(
    ({ createdAt, amount, zone, card: { oracleCard, ...coreFields } }) => {
      const card = { ...oracleCard, ...coreFields };
      if (zone !== undefined) card.zone = zone;
      if (amount !== undefined) card.amount = amount;
      if (createdAt !== undefined) card.createdAt = createdAt;
      return card;
    }
  );
};
