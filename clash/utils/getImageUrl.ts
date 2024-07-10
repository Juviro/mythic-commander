type Size = 'small' | 'normal' | 'large' | 'art_crop';

export const getImageUrl = (id: string, flipped?: boolean, size: Size = 'normal') => {
  const baseUrl = 'https://mythic-commander.com/';
  const face = flipped ? 'back' : 'front';
  return `${baseUrl}img/${id}_${size}_${face}.avif`;
};
