import React from 'react';
import styled from 'styled-components';
import { LayoutPicker } from '../../Shared';

const StyledWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-bottom: 16px;
`;

export default () => {
  return (
    <StyledWrapper>
      <LayoutPicker hideCard />
    </StyledWrapper>
  );
};
