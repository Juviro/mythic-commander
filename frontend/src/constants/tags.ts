import { tagColors } from './colors';

const DEFAULT_TAGS = tagColors
  .map(({ name }) => name)
  .filter((name) => name !== '???' && name !== 'Default');
export default DEFAULT_TAGS;
