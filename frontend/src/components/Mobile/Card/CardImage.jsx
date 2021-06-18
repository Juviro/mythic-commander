import React from 'react';
import styled from 'styled-components';

import FlippableCard from 'components/Elements/Shared/FlippableCard';

const StyledWrapper = styled.div`
  width: 90vw;
  height: 125vw;
  margin: 5vw 0 0;
`;

export default ({ card, loading }) => {
  return (
    <StyledWrapper>
      <FlippableCard card={card} loading={loading} />
    </StyledWrapper>
  );
};
