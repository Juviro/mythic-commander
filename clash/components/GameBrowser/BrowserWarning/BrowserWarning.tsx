import { Alert } from 'antd';
import React, { useEffect, useState } from 'react';

const MIN_SCREEN_WIDTH = 1400;

const BrowserWarning = () => {
  const [shouldDisplayWarning, setShouldDisplayWarning] = useState(false);

  const checkScreenSize = () => {
    if (typeof window === 'undefined') return;
    const isSmallScreen = window.innerWidth < MIN_SCREEN_WIDTH;
    setShouldDisplayWarning(isSmallScreen);
  };

  useEffect(() => {
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  if (!shouldDisplayWarning) return null;

  return (
    <Alert
      message={`
        Warning: Your browser window might be too small to display the game properly.
        Please consider resizing your window or using a larger screen.
      `}
      type="warning"
      showIcon
      style={{ padding: '3rem 5rem', fontSize: '1rem' }}
    />
  );
};

export default BrowserWarning;
