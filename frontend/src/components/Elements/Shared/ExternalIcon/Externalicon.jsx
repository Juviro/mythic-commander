import React from 'react';
import styled from 'styled-components';

import { ReactComponent as ExternalIcon } from '../../../../assets/icons/arrow-right-top.svg';

const StyledExternalIcon = styled(ExternalIcon)`
  height: ${({ size }) => size}px;
  width: ${({ size }) => size}px;
`;

const Externalicon = ({ size = 22 }) => {
  return <StyledExternalIcon size={size} />;
};

export default Externalicon;
