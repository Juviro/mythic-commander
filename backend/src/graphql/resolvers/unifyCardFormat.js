export default resourceId => ({ createdAt, amount, isCommander, ...card }) => ({
  id: `${card.id}+${resourceId}`,
  createdAt,
  amount,
  isCommander,
  card: { ...card, resourceId },
});
