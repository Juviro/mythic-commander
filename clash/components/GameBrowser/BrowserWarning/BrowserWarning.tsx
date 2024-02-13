/* eslint-disable max-len */
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
      message="Warning: Your browser window might be too small to display the game properly."
      type="warning"
      showIcon
      description="Please consider resizing your window, use a larger screen or zoom out and use binoculars."
      style={{ padding: '3rem 5rem', fontSize: '1rem' }}
    />
  );
};

export default BrowserWarning;
