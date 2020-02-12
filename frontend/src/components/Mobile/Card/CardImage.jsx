import React from 'react';
import styled from 'styled-components';

import FlippableCard from '../../Elements/FlippableCard/FlippableCard';

const StyledWrapper = styled.div`
  width: 90vw;
  height: 125vw;
  margin-top: 5vw;
`;

export default ({ cardImages, loading }) => {
  return (
    <StyledWrapper>
      <FlippableCard cardImages={cardImages} loading={loading} />
    </StyledWrapper>
  );
};
