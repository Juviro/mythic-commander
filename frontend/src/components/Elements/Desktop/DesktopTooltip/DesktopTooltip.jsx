import React from 'react';
import { Tooltip } from 'antd';
import isMobile from '../../../../utils/isMobile';

export default ({ children = null, ...tooltipProps }) => {
  if (isMobile()) return children;

  return <Tooltip {...tooltipProps}>{children}</Tooltip>;
};
