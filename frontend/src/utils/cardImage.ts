export const getImageUrl = (id: string, key: string, size = 'small', face = 'front') => {
  if (!id || !key) return null;

  return `https://img.scryfall.com/cards/${size}/${face}/${key}/${id}.jpg`;
};
