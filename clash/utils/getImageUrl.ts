type Size = 'small' | 'normal' | 'large';
type Face = 'front' | 'back';

export const getImageUrl = (id: string, size: Size = 'normal', face: Face = 'front') => {
  const baseUrl = 'https://mythic-commander.com/';
  return `${baseUrl}img/${id}_${size}_${face}.avif`;
};
