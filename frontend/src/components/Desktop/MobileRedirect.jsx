import React from 'react';

const MIN_SIZE = 764;

export default ({ children }) => {
  React.useEffect(() => {
    const { orientation, screen, location } = window;
    const isMobileDevice = typeof orientation !== 'undefined' || navigator.userAgent.indexOf('IEMobile') !== -1;
    const isMobile = isMobileDevice && (screen.height < MIN_SIZE || screen.width < MIN_SIZE);

    if (isMobile) {
      location.href = `/m${location.pathname}`;
    }
  }, []);

  return children;
};
