import { Typography } from 'antd';
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

const Styled404 = styled(Typography.Title)`
  && {
    font-size: 10rem;
  }
`;

const StyledMessage = styled(Typography.Text)`
  font-size: 2rem;
  padding: 24px;
`;

interface Props {
  message?: string;
}

export default ({ message = 'The requestet page could not be found' }: Props) => {
  return (
    <StyledWrapper>
      <Styled404>404</Styled404>
      <StyledMessage>{message}</StyledMessage>
    </StyledWrapper>
  );
};
