export default resourceId => ({
  createdAt,
  amount,
  isCommander,
  tags,
  ...card
}) => ({
  id: `${card.id}+${resourceId}`,
  createdAt,
  amount,
  isCommander,
  tags,
  card: { ...card, resourceId },
});
