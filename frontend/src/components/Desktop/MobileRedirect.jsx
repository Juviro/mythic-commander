import React from 'react';
import FullscreenSpinner from '../Elements/Spinner';

export const MOBILE_SCREEN_SIZE = 764;

export const getIsMobile = () => {
  const { orientation, screen } = window;
  const isMobileDevice =
    typeof orientation !== 'undefined' ||
    navigator.userAgent.indexOf('IEMobile') !== -1;
  return (
    isMobileDevice &&
    (screen.height < MOBILE_SCREEN_SIZE || screen.width < MOBILE_SCREEN_SIZE)
  );
};

export default ({ children }) => {
  const [isRedirecting, setIsRedirecting] = React.useState(false);
  React.useEffect(() => {
    if (getIsMobile()) {
      setIsRedirecting(true);
      window.location.href = `/m${window.location.pathname}`;
    }
  }, []);

  return isRedirecting ? <FullscreenSpinner /> : children;
};
