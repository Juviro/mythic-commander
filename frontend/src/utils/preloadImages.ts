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
