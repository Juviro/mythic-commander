import React from 'react';
import styled from 'styled-components';
import { MythicCommanderBanner } from '../../../Elements/Shared';

const StyledHeader = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  flex-direction: row;
`;

export default () => {
  return (
    <StyledHeader>
      <MythicCommanderBanner fontSize={18} />
    </StyledHeader>
  );
};
