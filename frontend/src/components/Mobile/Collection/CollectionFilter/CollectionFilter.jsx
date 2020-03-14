import React from 'react';
import styled from 'styled-components';
import { Filter } from '../../../Elements';

const StyledWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px;
`;

export default () => {
  return (
    <StyledWrapper>
      <Filter />
    </StyledWrapper>
  );
};
