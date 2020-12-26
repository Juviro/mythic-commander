const NO_IMG_URL = 'https://c2.scryfall.com/file/scryfall-errors/soon.jpg';

export const getImageUrl = (id: string, key: string, size = 'small', face = 'front') => {
  if (!id || !key) return NO_IMG_URL;

  return `https://img.scryfall.com/cards/${size}/${face}/${key}/${id}.jpg`;
};
