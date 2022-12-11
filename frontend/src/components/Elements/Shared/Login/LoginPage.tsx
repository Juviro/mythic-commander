import React from 'react';
import styled from 'styled-components';
import Login from './Login';

const StyledLoginPage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  background-color: #7f7f7f;
`;

const StyledInner = styled.div`
  width: 100%;
  max-width: 400px;
  height: 100%;
  max-height: 300px;
  display: flex;
  /* justify-content: center; */
  flex-direction: column;
  background-color: white;
  padding: 1.8rem;
  border-radius: 8px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
`;

const StyledTitle = styled.h1`
  font-size: 24px;
  margin: 0;
  padding: 0;
  text-align: center;
`;

const StyledLoginWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const LoginPage = () => {
  return (
    <StyledLoginPage>
      <StyledInner>
        <StyledTitle>Log into Mythic Commander</StyledTitle>
        <StyledLoginWrapper>
          <Login />
        </StyledLoginWrapper>
      </StyledInner>
    </StyledLoginPage>
  );
};

export default LoginPage;
