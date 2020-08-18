import isMobile from './isMobile';

export default (url: string) => {
  if (!isMobile()) return url;

  return `/m${url}`;
};
