import React, { useRef, useState } from 'react';
import { Divider, Typography } from 'antd';
import styled from 'styled-components';

import Filter from 'components/Elements/Shared/Filter';
import Flex from 'components/Elements/Shared/Flex';
import SearchHoc from 'components/Elements/Shared/SearchHoc';
import CurrentSearchOptions from 'components/Elements/Shared/CurrentSearchOptions';
import SearchButton from 'components/Elements/Shared/SearchButton';
import OrderBy from 'components/Elements/Shared/OrderBy';
import Confirm from 'components/Elements/Shared/Confirm';
import OneTimeInfoBox from 'components/Elements/Shared/OneTimeInfoBox';
import CardGrid from '../../../../Elements/Shared/CardGrid/CardGrid';
import boldText from '../../../../../utils/boldText';

const StyledCardWrapper = styled.div`
  display: contents;
`;

export default ({ onAddCards, alreadyInDeck }) => {
  const scrollRef = useRef(null);

  const [cardToAdd, setCardToAdd] = useState(null);
  const onAddCard = () => {
    onAddCards([{ id: cardToAdd.id, amount: 1 }], cardToAdd.name);
    setCardToAdd(null);
  };

  return (
    <>
      {cardToAdd && (
        <Confirm
          onOk={onAddCard}
          onCancel={() => setCardToAdd(null)}
          okText="Add"
          title={boldText(`Add <b>${cardToAdd.name}</b> to your deck?`)}
        />
      )}
      <SearchHoc blockInitialSearch>
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
          <Flex direction="column" style={{ padding: 10 }}>
            <Filter
              autoFocus
              onSearch={() => {
                onSearch();
                setTimeout(
                  () => scrollRef.current?.scrollIntoView({ behavior: 'smooth' }),
                  200
                );
              }}
              options={currentOptions}
              onChangeOption={onChangeOption}
            />
            <Flex>
              <Typography.Text strong style={{ width: 180 }}>
                Order by
              </Typography.Text>
              <OrderBy />
            </Flex>
            <SearchButton
              onSearch={() => {
                onSearch();
                setTimeout(
                  () => scrollRef.current?.scrollIntoView({ behavior: 'smooth' }),
                  200
                );
              }}
              loading={loading}
              onResetOptions={onResetOptions}
              isFilterResettable={Object.values(currentOptions).some(Boolean)}
              style={{ marginBottom: 8 }}
            />

            <div ref={scrollRef} />
            {isSearching && <CurrentSearchOptions style={{ marginTop: 8 }} showDivider />}
            <Divider />
            <StyledCardWrapper>
              {isSearching && (
                <>
                  <OneTimeInfoBox
                    showIcon
                    id="deck.add.drag"
                    description="Drag and drop cards to add them to your deck"
                  />
                  <CardGrid
                    dragProps={{ canDrag: true }}
                    cards={currentCards}
                    loading={loading}
                    cardWidth={200}
                    disableSelection
                    smallSelectionMenu
                    markAsDisabled={alreadyInDeck}
                    search={lastSearchOptions.name}
                    numberOfCards={numberOfCards}
                  />
                </>
              )}
            </StyledCardWrapper>
          </Flex>
        )}
      </SearchHoc>
    </>
  );
};
