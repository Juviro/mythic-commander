import { IS_DEV } from '../constants/network';

const NO_IMG_URL = 'https://c2.scryfall.com/file/scryfall-errors/soon.jpg';

export const getImageUrl = (id: string, _: any, size = 'small', face = 'front') => {
  if (!id) return NO_IMG_URL;

  const baseUrl = IS_DEV ? 'https://mythic-commander.com/' : '/';
  return `${baseUrl}img/${id}_${size}_${face}.avif`;
};

export const addBaseUrlToImg = (url: string) => {
  if (!IS_DEV) return url;
  if (url.startsWith('http')) return url;
  return `https://mythic-commander.com/${url}`;
};
