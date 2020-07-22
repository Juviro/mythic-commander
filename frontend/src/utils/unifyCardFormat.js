export const unifySingleCard = ({ oracleCard, ...coreFields }) => ({
  ...oracleCard,
  ...coreFields,
});

export default cards => {
  if (!cards) return null;
  return cards.map(
    ({ createdAt, amount, isCommander, card: { oracleCard, ...coreFields } }) => {
      const card = { ...oracleCard, ...coreFields };
      if (isCommander !== undefined) card.isCommander = isCommander;
      if (amount !== undefined) card.amount = amount;
      if (createdAt !== undefined) card.createdAt = createdAt;
      return card;
    }
  );
};
