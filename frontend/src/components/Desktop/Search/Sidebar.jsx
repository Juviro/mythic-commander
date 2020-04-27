import React from 'react';
import styled from 'styled-components';

import { Sidebar } from '../../Elements/Desktop';
import { SearchButton, Filter, Flex, ResetFilter } from '../../Elements/Shared';

const StyledContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 600px;
  width: 100%;
  flex-direction: column;
`;

export default ({
  onChangeOption,
  isVisible,
  toggleIsVisible,
  onSearch,
  loading,
  options,
  onResetOptions,
  isFullscreen,
}) => {
  const isFilterResettable = Object.values(options).some(Boolean);

  return (
    <Sidebar
      isVisible={isVisible}
      isFullscreen={isFullscreen}
      toggleIsVisible={toggleIsVisible}
      wrapperStyle={{
        padding: '12px 24px',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <StyledContent>
        <Filter
          advancedSearch
          onSearch={onSearch}
          autoFocus
          options={options}
          onChangeOption={onChangeOption}
        />

        <Flex
          direction="row"
          justify="space-between"
          align="center"
          style={{ marginTop: 24, width: '100%' }}
        >
          <span>
            {isFilterResettable && (
              <ResetFilter title="reset" onReset={onResetOptions} />
            )}
          </span>
          <SearchButton onSearch={onSearch} loading={loading} />
        </Flex>
      </StyledContent>
    </Sidebar>
  );
};
