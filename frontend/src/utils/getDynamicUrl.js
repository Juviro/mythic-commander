import isMobile from './isMobile';

export default url => {
  if (!isMobile()) return url;

  return `/m${url}`;
};
