import React from 'react';
import { Tooltip } from 'antd';
import styled from 'styled-components';
import { InfoCircleOutlined } from '@ant-design/icons';

import { primary } from 'constants/colors';
import isMobile from 'utils/isMobile';

const StyledIcon = styled(InfoCircleOutlined)`
  margin-left: 6px;
  font-size: 16px;
  cursor: help;
  color: ${primary};
`;

interface Props {
  text?: React.ReactNode;
  large?: boolean;
}

const Hint = ({ text, large }: Props) => {
  if (!text) return null;

  const isLargeMobile = isMobile() && large;

  const getWidth = () => {
    if (isLargeMobile) return '100vw';
    if (large) return '500px';
    return undefined;
  };

  const getOverlayStyle = () => {
    if (isLargeMobile) return { left: 0 };
    return undefined;
  };

  return (
    <Tooltip
      title={text}
      overlayStyle={getOverlayStyle()}
      overlayInnerStyle={{
        width: getWidth(),
      }}
    >
      <StyledIcon />
    </Tooltip>
  );
};

export default Hint;
