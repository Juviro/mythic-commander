import React from 'react';
import styled from 'styled-components';

import { Sidebar } from '../../Elements/Desktop';
import { SearchButton, Filter, Flex, ResetFilter } from '../../Elements/Shared';

const StyledContent = styled.div`
  width: 100%;
  display: flex;
  max-width: 500px;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: white;
  padding: 24px;
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
        padding: 0,
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: '#f1f2f5',
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
