export default (card, { returnAll = false, size = 'normal' } = {}) => {
  const isTwoFaced = !card.image_uris;
  if (returnAll) {
    return isTwoFaced
      ? card.card_faces.map(({ image_uris }) => image_uris[size])
      : [card.image_uris[size]];
  }

  return isTwoFaced
    ? card.card_faces[0].image_uris[size]
    : card.image_uris[size];
};
