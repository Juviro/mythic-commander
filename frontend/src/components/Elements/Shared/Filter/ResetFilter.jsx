import React from 'react';
import { Button } from 'antd';
import styled from 'styled-components';

import { fadeIn } from '../../../Animations';

const StyledButton = styled(Button)`
  animation: ${fadeIn} 0.3s linear;
`;

export default ({ title = 'Reset Filter', onReset }) => {
  return (
    <StyledButton danger ghost type="primary" onClick={onReset}>
      {title}
    </StyledButton>
  );
};
