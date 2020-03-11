import React from 'react';
import FullscreenSpinner from '../Elements/Spinner';

const MIN_SIZE = 764;

export default ({ children }) => {
  const [isM, setIsM] = React.useState(false);
  React.useEffect(() => {
    const { orientation, screen, location } = window;
    const isMobileDevice =
      typeof orientation !== 'undefined' ||
      navigator.userAgent.indexOf('IEMobile') !== -1;
    const isMobile =
      isMobileDevice && (screen.height < MIN_SIZE || screen.width < MIN_SIZE);
    console.log('isMobile :', isMobile);

    if (isMobile) {
      setIsM(true);
      location.href = `/m${location.pathname}`;
    }
  }, []);

  return isM ? <FullscreenSpinner /> : children;
};
