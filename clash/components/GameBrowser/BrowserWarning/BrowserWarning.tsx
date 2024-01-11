import { Alert } from 'antd';
import React, { useEffect, useState } from 'react';

const BrowserWarning = () => {
  const [shouldDisplayWarning, setShouldDisplayWarning] = useState(false);

  // navigator is not defined in SSR, therefore we need an effect
  useEffect(() => {
    if (typeof navigator === 'undefined') return;
    const isFirefox = navigator.userAgent.includes('Firefox');
    setShouldDisplayWarning(isFirefox);
  }, []);

  if (!shouldDisplayWarning) return null;

  return (
    <Alert
      message={`
        Error: The Firefox browser is not supported yet. 
        Please use Chrome or Edge. Safari might work as well, but has some smaller issues.
      `}
      type="error"
      showIcon
      style={{ padding: '3rem 5rem', fontSize: '1rem' }}
    />
  );
};

export default BrowserWarning;
