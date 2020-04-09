import React from 'react';
import { Tooltip } from 'antd';
import isMobile from '../../../../utils/isMobile';

export default ({ children, ...tooltipProps }) => {
  if (isMobile()) return children;

  return <Tooltip {...tooltipProps}>{children}</Tooltip>;
};
