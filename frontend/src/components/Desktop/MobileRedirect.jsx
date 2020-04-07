import React from 'react';
import { Spinner } from '../Elements/Shared';
import isMobile from '../../utils/isMobile';

export default ({ children }) => {
  const [isRedirecting, setIsRedirecting] = React.useState(false);
  React.useEffect(() => {
    if (isMobile()) {
      setIsRedirecting(true);
      window.location.href = `/m${window.location.pathname}`;
    }
  }, []);

  return isRedirecting ? <Spinner /> : children;
};
