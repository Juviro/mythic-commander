import React from 'react';
import { Tooltip } from 'antd';
import styled from 'styled-components';
import { InfoCircleOutlined } from '@ant-design/icons';

import { primary } from 'constants/colors';

const StyledIcon = styled(InfoCircleOutlined)`
  margin-left: 6px;
  font-size: 16px;
  cursor: help;
  color: ${primary};
`;

interface Props {
  text?: React.ReactNode;
}

const Hint = ({ text }: Props) => {
  if (!text) return null;

  return (
    <Tooltip title={text}>
      <StyledIcon />
    </Tooltip>
  );
};

export default Hint;
