import React, { useContext, useRef, useState } from 'react';
import { Divider, Typography } from 'antd';
import styled from 'styled-components';

import {
  Filter,
  Flex,
  SearchHoc,
  CurrentSearchOptions,
  SearchButton,
  OrderBy,
  Confirm,
  OneTimeInfoBox,
} from '../../../../Elements/Shared';
import CardGrid from '../../../../Elements/Shared/CardGrid/CardGrid';
import FocusContext from '../../../../Provider/FocusProvider/FocusProvider';
import boldText from '../../../../../utils/boldText';

const StyledCardWrapper = styled.div`
  display: contents;
`;

export default ({ onAddCards, alreadyInDeck }) => {
  const scrollRef = useRef(null);
  const { focusedElements } = useContext(FocusContext);
  // check if this has focus, ignore if details modal is open
  const blockShortcuts =
    focusedElements.filter((focusId) => focusId !== 'modal.cardDetails').pop() !==
    'deck.sidebar.add';

  const [cardToAdd, setCardToAdd] = useState(null);
  const onAddCard = () => {
    onAddCards([{ id: cardToAdd.id, amount: 1 }], cardToAdd.name);
    setCardToAdd(null);
  };
  const onEnter = blockShortcuts ? null : (card) => setCardToAdd(card);

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
          <Flex direction="column" style={{ padding: 16 }}>
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
                    cardsPerRow={2}
                    cardWidth={200}
                    onEnter={onEnter}
                    disableSelection
                    markAsDisabled={alreadyInDeck}
                    blockShortcuts={blockShortcuts}
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
