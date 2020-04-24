import React from 'react';
import styled from 'styled-components';

import { Typography } from 'antd';
import icon from '../../../../assets/icons/favicon.ico';

const StyledWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
`;

const StyledIcon = styled.img`
  height: 80%;
  margin: 16px;
`;

export default () => {
  return (
    <StyledWrapper>
      <StyledIcon src={icon} />
      <Typography.Text
        style={{ fontSize: 20, color: 'rgba(255, 255, 255, 0.65)' }}
      >
        Mythic Commander
      </Typography.Text>
    </StyledWrapper>
  );
};
