import { Typography } from 'antd';
import GoogleLogin from 'components/Elements/Shared/Login';
import React from 'react';
import styled from 'styled-components';

const StyledWrapper = styled.section`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const StyledMessage = styled(Typography.Text)`
  margin-top: 2rem;
  font-size: 24px;
`;

interface Props {
  message?: string;
}

export const LoginRequired = ({
  message = 'You need to log in to see this page',
}: Props) => {
  return (
    <StyledWrapper>
      <GoogleLogin />
      <StyledMessage>{message}</StyledMessage>
    </StyledWrapper>
  );
};
