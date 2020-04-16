import { getImageUrl } from './cardImage';

export default (cards, sizes = ['normal']) => {
  cards.forEach(({ id, imgKey }) => {
    sizes.forEach(size => {
      const img = new Image();
      img.src = getImageUrl(id, imgKey, size);
    });
  });
};
