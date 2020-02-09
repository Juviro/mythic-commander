import React from 'react';
import styled from 'styled-components';
import { Spin } from 'antd';

const StyledCardLoader = styled.div`
  width: 100%;
  height: 100%;
  min-height: 100px;
  display: flex;
  position: absolute;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
  ${({ hideBorder }) => !hideBorder && 'border: 1px solid #e3e3e3;'}
`;

export default ({ hideBorder }) => {
  return (
    <StyledCardLoader hideBorder={hideBorder}>
      <Spin />
    </StyledCardLoader>
  );
};
