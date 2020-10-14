import React from 'react';
import styled from 'styled-components';

const StyledWrapper = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgba(0, 255, 0, 0.3);
`;

export default ({ visible }) => {
  if (!visible) return null;

  return <StyledWrapper>Coming soon</StyledWrapper>;
};
