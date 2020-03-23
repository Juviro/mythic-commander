import React from 'react';
import styled from 'styled-components';

import Menu from './Menu';
import Stats from './Stats';
import Title from './Title';

const StyledRowWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-right: 8px;
  font-size: 26px;
  justify-content: space-between;
`;

export default ({ wantsList }) => {
  return (
    <>
      <StyledRowWrapper>
        <Title wantsList={wantsList} />
        {wantsList && <Menu />}
      </StyledRowWrapper>
      <Stats wantsList={wantsList} />
    </>
  );
};
