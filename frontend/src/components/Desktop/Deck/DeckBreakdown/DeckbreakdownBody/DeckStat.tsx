import { Divider, Typography } from 'antd';
import React from 'react';
import styled from 'styled-components';

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
    <>
      <StyledDivider />
      <Typography.Text strong style={{ fontSize: 16 }}>
        {title}
      </Typography.Text>
      {!hidden && children}
    </>
  );
};
