import React from 'react';
import styled from 'styled-components';

import { SearchButton, Filter } from '../../Elements/Shared';

const StyledCenterWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const StyledContent = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
  background-color: white;
  overflow: auto;
  padding: 12px;
  max-width: 700px;
`;

export default ({ onChangeOption, onSearch, loading, options, onResetOptions }) => {
  const isFilterResettable = Object.values(options).some(Boolean);

  return (
    <StyledCenterWrapper>
      <StyledContent>
        <Filter
          onSearch={onSearch}
          autoFocus
          size="default"
          options={options}
          onChangeOption={onChangeOption}
        />
        <SearchButton
          onSearch={onSearch}
          loading={loading}
          onResetOptions={onResetOptions}
          isFilterResettable={isFilterResettable}
        />
      </StyledContent>
    </StyledCenterWrapper>
  );
};
