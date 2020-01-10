import React from 'react';
import styled from 'styled-components';

import SearchField from '../SearchField';
import MultiInput from './MultIinput';

const StyledWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
`;

const StyledSearchSection = styled.div`
  height: 100%;
  display: block;
`;

export default ({ onAddCards, searchInputRef }) => {
  return (
    <StyledWrapper>
      <StyledSearchSection>
        <SearchField ref={searchInputRef} onSearch={card => onAddCards([card])} defaultActiveFirstOption resetSearch />
        <MultiInput onAddCards={onAddCards} />
      </StyledSearchSection>
    </StyledWrapper>
  );
};
