import React from 'react';
import styled from 'styled-components';
import MythicCommanderBanner from 'components/Elements/Shared/MythicCommanderBanner';

const StyledHeader = styled.div`
  width: 100%;
  padding: 8px;
  display: flex;
  flex-direction: column;
`;
export default () => {
  return (
    <StyledHeader>
      <MythicCommanderBanner fontSize={18} />
    </StyledHeader>
  );
};
