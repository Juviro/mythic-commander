type Size = 'small' | 'normal' | 'large' | 'art_crop';

export const getImageUrl = (id: string, transformed?: boolean, size: Size = 'normal') => {
  const baseUrl = 'https://mythic-commander.com/';
  const face = transformed ? 'back' : 'front';
  return `${baseUrl}img/${id}_${size}_${face}.avif`;
};

// image urls of new decks start with https://mythic-commander.com/, old ones don't
export const getDeckImgUrl = (imgSrc: string) => {
  if (imgSrc.startsWith('https://mythic-commander.com/')) {
    return imgSrc;
  }

  return `https://mythic-commander.com/${imgSrc}`;
};
