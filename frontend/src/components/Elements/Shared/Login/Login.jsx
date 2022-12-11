import React from 'react';
import styled from 'styled-components';

import GoogleLogin from './GoogleLogin';

const StyledWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Login = ({ onLogin = null }) => {
  return (
    <StyledWrapper>
      <GoogleLogin onLogin={onLogin} />
    </StyledWrapper>
  );
};

export default Login;
