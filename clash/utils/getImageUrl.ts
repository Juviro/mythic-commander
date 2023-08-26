type Size = 'small' | 'normal' | 'large';

export const getImageUrl = (id: string, size: Size = 'normal', face = 'front') => {
  const baseUrl = 'https://mythic-commander.com/';
  return `${baseUrl}img/${id}_${size}_${face}.avif`;
};
