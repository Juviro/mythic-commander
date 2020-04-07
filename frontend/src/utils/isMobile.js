export const MOBILE_SCREEN_SIZE = 764;

export default () => {
  const { orientation, screen } = window;
  const isMobileDevice =
    typeof orientation !== 'undefined' ||
    navigator.userAgent.indexOf('IEMobile') !== -1;
  return (
    isMobileDevice &&
    (screen.height < MOBILE_SCREEN_SIZE || screen.width < MOBILE_SCREEN_SIZE)
  );
};
