import React, { useEffect } from 'react';

import Spinner from 'components/Elements/Shared/Spinner';
import isMobile from '../../utils/isMobile';
import { useToggle } from '../Hooks';

export default ({ children }) => {
  const [isRedirecting, toggleIsRedirecting] = useToggle(false);
  useEffect(() => {
    if (isMobile()) {
      toggleIsRedirecting();
      window.location.href = `/m${window.location.pathname}`;
    }
    // eslint-disable-next-line
  }, []);

  return isRedirecting ? <Spinner /> : children;
};
