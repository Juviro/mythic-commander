import React, { useContext, useState } from 'react';
import { Divider, Typography } from 'antd';
import styled from 'styled-components';

import {
  Filter,
  Flex,
  SearchHoc,
  CurrentShareOptions,
  SearchButton,
  OrderBy,
  Confirm,
} from '../../../../Elements/Shared';
import CardGrid from '../../../../Elements/Desktop/PaginatedCardList/CardGrid/CardGrid';
import FocusContext from '../../../../Provider/FocusProvider/FocusProvider';
import boldText from '../../../../../utils/boldText';

const StyledCardWrapper = styled.div`
  display: contents;
`;

export default ({ onAddCards, alreadyInDeck }) => {
  const { focusedElements } = useContext(FocusContext);
  // check if this has focus, ignore if details modal is open
  const blockShortcuts =
    focusedElements.filter(focusId => focusId !== 'modal.cardDetails').pop() !==
    'deck.sidebar.add';

  const [cardToAdd, setCardToAdd] = useState(null);
  const onAddCard = () => {
    onAddCards([{ id: cardToAdd.id, amount: 1 }], cardToAdd.name);
    setCardToAdd(null);
  };
  const onEnter = card => setCardToAdd(card);

  return (
    <>
      {cardToAdd && (
        <Confirm
          onOk={onAddCard}
          onCancel={() => setCardToAdd(null)}
          okText="Add"
          title="Add card to deck"
          text={boldText(`Add <b>${cardToAdd.name}</b> to your deck?`)}
        />
      )}
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
            <SearchButton
              onSearch={onSearch}
              loading={loading}
              onResetOptions={onResetOptions}
              isFilterResettable={Object.values(currentOptions).some(Boolean)}
              style={{ marginBottom: 8 }}
            />
            <CurrentShareOptions style={{ marginTop: 8 }} showDivider />
            <Divider />
            <StyledCardWrapper>
              <Flex>
                <Typography.Text strong style={{ width: 130 }}>
                  Order by:
                </Typography.Text>
                <OrderBy />
              </Flex>
              {isSearching && (
                <CardGrid
                  cards={currentCards}
                  loading={loading}
                  cardsPerRow={2}
                  cardWidth={200}
                  onEnter={onEnter}
                  markAsDisabled={alreadyInDeck}
                  blockShortcuts={blockShortcuts}
                  search={lastSearchOptions.name}
                  numberOfCards={numberOfCards}
                />
              )}
            </StyledCardWrapper>
          </Flex>
        )}
      </SearchHoc>
    </>
  );
};
