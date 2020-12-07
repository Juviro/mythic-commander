import { Card } from 'antd';
import { CardProps } from 'antd/lib/card';
import React from 'react';
import styled from 'styled-components';

interface Props extends CardProps {
  children: React.ReactNode;
}

const StyledCard = styled(Card)`
  border-bottom: none;

  :not(:first-child) {
    margin-top: 32px;
  }
`;

export default ({ children, ...rest }: Props) => {
  return <StyledCard {...rest}>{children}</StyledCard>;
};
