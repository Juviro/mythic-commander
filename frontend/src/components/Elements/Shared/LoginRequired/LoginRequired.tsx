import { Typography } from 'antd';
import React from 'react';
import styled from 'styled-components';
import Login from '../Login/Login';

const StyledWrapper = styled.section`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 5rem;
`;

const StyledMessage = styled(Typography.Text)`
  font-size: 24px;
  margin-top: 4rem;
`;

interface Props {
  message?: string;
}

export const LoginRequired = ({
  message = 'You need to log in to see this page',
}: Props) => {
  return (
    <StyledWrapper>
      <Login />
      <StyledMessage>{message}</StyledMessage>
    </StyledWrapper>
  );
};
