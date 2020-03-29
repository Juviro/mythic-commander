export default resourceId => ({ createdAt, amount, zone, ...card }) => ({
  id: `${card.id}+${resourceId}`,
  createdAt,
  amount,
  zone,
  card,
});
