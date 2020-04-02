import React from 'react';
import styled from 'styled-components';

import CardSearch from '../CardSearch';
import MultiInput from './MultIinput';

const StyledWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export default ({ onAddCards, searchInputRef, autoFocus }) => {
  return (
    <StyledWrapper>
      <CardSearch
        ref={searchInputRef}
        onSearch={(card, name) => onAddCards([card], name)}
        defaultActiveFirstOption
        resetSearch
        autoFocus={autoFocus}
      />
      <MultiInput onAddCards={onAddCards} />
    </StyledWrapper>
  );
};
