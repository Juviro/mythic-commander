export const getImageUrl = (id: string, size = 'small', face = 'front') => {
  const baseUrl = 'https://mythic-commander.com/';
  return `${baseUrl}img/${id}_${size}_${face}.avif`;
};
