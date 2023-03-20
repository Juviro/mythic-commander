import React from 'react';
import styled from 'styled-components';

import Card from 'components/Elements/Shared/Card';

const StyledWrapper = styled.div`
  width: 90vw;
  height: 125vw;
  margin: 5vw 0 0;
`;

export default ({ card, loading, onFlipCard }) => {
  return (
    <StyledWrapper>
      <Card card={card} loading={loading} onFlipCard={onFlipCard} />
    </StyledWrapper>
  );
};
