import React, { useContext } from 'react';
import { Divider, Typography } from 'antd';
import styled from 'styled-components';

import {
  Filter,
  Flex,
  SearchHoc,
  CurrentShareOptions,
  SearchButton,
  OrderBy,
} from '../../../../Elements/Shared';
import CardGrid from '../../../../Elements/Desktop/PaginatedCardList/CardGrid/CardGrid';
import FocusContext from '../../../../Provider/FocusProvider/FocusProvider';

const StyledCardWrapper = styled.div``;

export default () => {
  const { focusedElement } = useContext(FocusContext);
  const blockShortcuts = focusedElement !== 'deck.sidebar.add';

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
        <Flex direction="column" style={{ padding: 16 }}>
          <Filter
            autoFocus
            onSearch={onSearch}
            options={currentOptions}
            onChangeOption={onChangeOption}
          />
          <Flex>
            <Typography.Text strong style={{ width: 130 }}>
              Order by:
            </Typography.Text>
            <OrderBy />
          </Flex>
          <Divider />
          <SearchButton
            onSearch={onSearch}
            loading={loading}
            onResetOptions={onResetOptions}
            isFilterResettable={Object.values(currentOptions).some(Boolean)}
            style={{ marginBottom: 16, marginTop: 0, width: '80%' }}
          />
          <CurrentShareOptions style={{ marginTop: 8 }} />
          <StyledCardWrapper>
            {isSearching && (
              <CardGrid
                cards={currentCards}
                loading={loading}
                cardsPerRow={2}
                cardWidth={200}
                blockShortcuts={blockShortcuts}
                search={lastSearchOptions.name}
                numberOfCards={numberOfCards}
              />
            )}
          </StyledCardWrapper>
        </Flex>
      )}
    </SearchHoc>
  );
};
