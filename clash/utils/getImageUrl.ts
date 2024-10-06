type Size = 'small' | 'normal' | 'large' | 'art_crop';

export const getImageUrl = (id: string, transformed?: boolean, size: Size = 'normal') => {
  const baseUrl = 'https://mythic-commander.com/';
  const face = transformed ? 'back' : 'front';
  return `${baseUrl}img/${id}_${size}_${face}.avif`;
};
