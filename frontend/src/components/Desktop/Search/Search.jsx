import React from 'react';
import styled, { css } from 'styled-components';

import Sidebar from './Sidebar';
import { useToggle } from '../../Hooks';
import { PaginatedCardList } from '../../Elements/Desktop';
import { lightBackground } from '../../../constants/colors';
import { SearchHoc } from '../../Elements/Shared';

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: row;
  height: 100%;
  background-color: 'white';
  ${({ isFullscreen }) =>
    isFullscreen
      ? css`
          height: fit-content;
          min-height: 100%;
          background-color: ${lightBackground};
        `
      : ''};
`;

export default () => {
  const [isSidebarVisible, toggleIsSidebarVisible] = useToggle(true);

  return (
    <SearchHoc>
      {({
        isSearching,
        loading,
        onSearch,
        onResetOptions,
        onChangeOption,
        currentOptions,
        lastSearchOptions,
        currentCards,
        numberOfCards,
      }) => (
        <StyledWrapper isFullscreen={!isSearching}>
          <Sidebar
            loading={loading}
            onSearch={onSearch}
            onResetOptions={onResetOptions}
            onChangeOption={onChangeOption}
            options={currentOptions}
            isVisible={isSidebarVisible}
            isFullscreen={!isSearching}
            toggleIsVisible={toggleIsSidebarVisible}
          />
          {isSearching && (
            <PaginatedCardList
              loading={loading}
              search={lastSearchOptions.name}
              hiddenColumns={['added', 'amount']}
              cards={currentCards}
              widthOffset={isSidebarVisible ? 329 : 0}
              numberOfCards={numberOfCards}
            />
          )}
        </StyledWrapper>
      )}
    </SearchHoc>
  );
};
