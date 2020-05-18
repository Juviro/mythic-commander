import React from 'react';
import styled, { css } from 'styled-components';

import { Sidebar } from '../../Elements/Desktop';
import { SearchButton, Filter } from '../../Elements/Shared';

const StyledContent = styled.div`
  width: 100%;
  display: flex;
  max-width: 600px;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
  background-color: white;
  overflow: auto;
  padding: 12px;
  ${({ isFullscreen }) =>
    isFullscreen
      ? css`
          margin: 8px;
          padding: 32px;
          height: fit-content;
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
          onSearch={onSearch}
          autoFocus
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
    </Sidebar>
  );
};
