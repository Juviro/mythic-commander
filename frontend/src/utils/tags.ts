import { tagColors } from 'constants/colors';

export const getTagColor = (tag: string) => {
  if (tag === 'Untagged') return null;
  return tagColors.find(({ name }) => name === tag) ?? tagColors[tagColors.length - 1];
};
