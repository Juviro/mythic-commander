export default (resourceId) =>
  ({ createdAt, amount, isCommander, isDefault, tags, ...card }) => ({
    id: `${card.id}+${resourceId}`,
    createdAt,
    amount,
    isCommander,
    isDefault,
    tags,
    card: { ...card, resourceId },
  });
