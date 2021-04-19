import React from 'react';
import { Divider, Typography } from 'antd';
import styled from 'styled-components';

const StyledPlaceholder = styled.aside`
  width: 700px;
  min-width: 600px;
  min-height: 700px;
  display: flex;
  flex-direction: column;
  padding: 24px;
  margin-left: 24px;
  background-color: white;
  height: fit-content;
  box-shadow: 0px 0px 10px 4px #9c9c9c;

  @media (min-width: 2000px) {
    margin-right: -80px;
    margin-left: 48px;
  }

  @media (min-width: 2200px) {
    margin-right: -200px;
  }
`;

export const DeckStats = () => {
  return (
    <StyledPlaceholder>
      <Typography.Title level={3}>Deck Breakdown</Typography.Title>
      <Divider />
    </StyledPlaceholder>
  );
};
