export const getImageUrl = (id, key, size = 'small', face = 'front') => {
  if (!id || !key) return null;

  return `https://img.scryfall.com/cards/${size}/${face}/${key}/${id}.jpg`;
};
