import React from 'react';
import styled from 'styled-components';
import CollectionOverview from '../../Mobile/Collection/CollectionOverview';

const StyledWrapper = styled.div`
  width: 300px;
  height: 100%;
  margin-right: 16px;
  font-size: 16px;
`;

export default ({ cards }) => {
  return (
    <StyledWrapper>
      <CollectionOverview cards={cards} size="middel" column={1} />
    </StyledWrapper>
  );
};
