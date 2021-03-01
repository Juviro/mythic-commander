import GoogleLogin from 'components/Elements/Shared/Login';
import React from 'react';
import styled from 'styled-components';

const StyledWrapper = styled.div`
  width: 200px;
  height: 200px;
`;

export default ({ onLogin }) => {
  return (
    <StyledWrapper>
      <GoogleLogin onLogin={onLogin} />
    </StyledWrapper>
  );
};
