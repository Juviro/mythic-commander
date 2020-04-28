import React from 'react';
import styled, { css } from 'styled-components';

import { Sidebar } from '../../Elements/Desktop';
import { SearchButton, Filter, Flex, ResetFilter } from '../../Elements/Shared';

const StyledContent = styled.div`
  width: 100%;
  display: flex;
  max-width: 500px;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
  background-color: white;
  padding: 12px;
  overflow: auto;
  ${({ isFullscreen }) =>
    isFullscreen
      ? css`
          margin: 8px;
          box-shadow: 0px 0px 5px 3px #d0d0d0;
        `
      : ''}
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
      width={350}
      isVisible={isVisible}
      isFullscreen={isFullscreen}
      toggleIsVisible={toggleIsVisible}
      wrapperStyle={{
        padding: '0 12px',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <StyledContent isFullscreen={isFullscreen}>
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
