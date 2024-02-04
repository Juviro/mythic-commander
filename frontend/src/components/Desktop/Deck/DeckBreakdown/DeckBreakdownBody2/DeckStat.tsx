import { Divider, Typography } from 'antd';
import React from 'react';
import styled from 'styled-components';

const StyledWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
`;

const StyledDivider = styled(Divider)`
  && {
    margin: 32px 0px 12px !important;
  }
`;

interface Props {
  children: React.ReactNode;
  title: React.ReactNode;
  hidden?: boolean;
}

export const DeckStat = ({ children, title, hidden }: Props) => {
  return (
    <StyledWrapper>
      <StyledDivider />
      <Typography.Title level={3} style={{ fontSize: 18 }}>
        {title}
      </Typography.Title>
      {!hidden && children}
    </StyledWrapper>
  );
};
