import React from 'react';
import styled from 'styled-components';

import { FlippableCard } from '../../Elements';

const StyledWrapper = styled.div`
  width: 90vw;
  height: 125vw;
  margin: 5vw 0 0;
`;

export default ({ cardImages, loading }) => {
  return (
    <StyledWrapper>
      <FlippableCard cardImages={cardImages} loading={loading} />
    </StyledWrapper>
  );
};
