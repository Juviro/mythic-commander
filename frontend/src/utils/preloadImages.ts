import { UnifiedCard } from 'types/unifiedTypes';
import { getImageUrl } from './cardImage';

export default (cards: UnifiedCard[], sizes: string[] = ['normal']) => {
  cards.forEach(({ id, imgKey }) => {
    sizes.forEach((size) => {
      const img = new Image();
      img.src = getImageUrl(id, imgKey, size);
    });
  });
};

export const preloadByStrings = (sources: string[]): Promise<unknown[]> => {
  const promises = sources.map((imgSrc) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = imgSrc;
      img.onload = () => {
        resolve(null);
      };
      img.onerror = () => {
        reject();
      };
    });
  });

  return Promise.all(promises);
};
