import React from 'react';
import styled from 'styled-components';
import { CardListDesktop } from '../../Elements';

const StyledWrapper = styled.div`
  padding: 24px;
  width: 100%;
`;

export default ({ cards, loading }) => {
  return (
    <StyledWrapper>
      <CardListDesktop cards={cards} loading={loading} />
    </StyledWrapper>
  );
};
