import React from 'react';
import styled from 'styled-components';
import { CardListDesktop } from '../../Elements/Desktop';

const StyledWrapper = styled.div`
  padding: 24px;
  width: 100%;
`;

export default ({ cards, loading, isSidebarVisible }) => {
  const widthOffset = isSidebarVisible ? 400 : 0;
  return (
    <StyledWrapper>
      <CardListDesktop
        cards={cards}
        loading={loading}
        widthOffset={widthOffset}
      />
    </StyledWrapper>
  );
};
