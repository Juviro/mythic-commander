import React from 'react';
import styled from 'styled-components';

import { Typography } from 'antd';
import icon from '../../../../assets/icons/favicon.ico';

const StyledWrapper = styled.div`
  display: flex;
  align-items: center;
  height: 32px;
`;

const StyledIcon = styled.img`
  height: 100%;
`;

export default ({ fontSize = 20, style }) => {
  return (
    <StyledWrapper style={style}>
      <StyledIcon src={icon} />
      <Typography.Text
        style={{ fontSize, color: 'rgba(255, 255, 255, 0.8)', marginLeft: 16 }}
      >
        Mythic Commander
      </Typography.Text>
    </StyledWrapper>
  );
};
