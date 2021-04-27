import React from 'react';
import { Tooltip } from 'antd';
import styled from 'styled-components';
import { ExclamationCircleOutlined } from '@ant-design/icons';

import { primary } from 'constants/colors';

const StyledIcon = styled(ExclamationCircleOutlined)`
  margin-left: 6px;
  font-size: 16px;
  color: ${primary};
`;

interface Props {
  numberOfNotIncludedCards?: number;
}

export const NotIncludedInfo = ({ numberOfNotIncludedCards }: Props) => {
  if (!numberOfNotIncludedCards) return null;

  return (
    <Tooltip title={`No price available for ${numberOfNotIncludedCards} card(s)`}>
      <StyledIcon />
    </Tooltip>
  );
};
