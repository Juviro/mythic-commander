import React from 'react';
import { Button } from 'antd';
import styled from 'styled-components';

import { fadeIn } from '../../../Animations';

const StyledButton = styled(Button)`
  animation: ${fadeIn} 0.3s linear;
`;

export default ({ title = 'reset filter', onReset }) => {
  return (
    <StyledButton
      danger
      type="link"
      onClick={onReset}
      style={{ height: 14, lineHeight: 0 }}
    >
      {title}
    </StyledButton>
  );
};
