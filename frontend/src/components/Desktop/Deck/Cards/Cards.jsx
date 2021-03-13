import React, { useContext, useRef, useState } from 'react';
import { Skeleton, Empty, Button } from 'antd';
import styled, { css } from 'styled-components';

import { Flex } from '../../../Elements/Shared';
import getCardsByType from '../../../../utils/getCardsByType';
import CardLists from './CardLists';
import { sortByCmc, sortByName } from '../../../../utils/cardFilter';
import FocusContext from '../../../Provider/FocusProvider/FocusProvider';
import { primary } from '../../../../constants/colors';
import { Dropzone } from '../../../Elements/Desktop';

const StyledWrapper = styled.div`
  margin: 8px;
  width: calc(100% - 16px);
  transition: all 0.3s;
  display: flex;
  justify-content: center;
  min-height: 400px;
  flex: 1;

  ${({ isFocused }) =>
    isFocused
      ? css`
          box-shadow: inset 0 0 10px 3px ${primary};
        `
      : ''}
`;

export default ({ deck, loading, onAddCards, displayOwnedOnly }) => {
  const { focusedElement } = useContext(FocusContext);
  const isFocused = focusedElement === 'deck.cards';

  const [isSmall, setIsSmall] = useState(false);

  const wrapperRef = useRef(null);

  const sortedCards = deck && sortByCmc(sortByName(deck.cards));
  const cardsByType = deck && getCardsByType(sortedCards).cardsByType;
  console.log('cardsByType', cardsByType);

  if (loading)
    return (
      <Flex style={{ margin: 16 }}>
        <Skeleton />
      </Flex>
    );

  const onDrop = ({ id, name, amount = 1 }) => {
    onAddCards([{ id, amount }], name);
  };

  return (
    <>
      <Button onClick={() => setIsSmall(!isSmall)}>Toggle Width</Button>
      <StyledWrapper
        isFocused={isFocused}
        ref={wrapperRef}
        style={{ width: isSmall ? 800 : undefined }}
      >
        <Dropzone onDrop={onDrop} listId={deck.id}>
          {cardsByType.length ? (
            <Flex direction="row" wrap="wrap">
              <CardLists
                cardsByType={cardsByType}
                deck={deck}
                displayOwnedOnly={displayOwnedOnly}
              />
            </Flex>
          ) : (
            <Flex
              justify="center"
              align="center"
              style={{ width: '100%', marginTop: 120 }}
            >
              <Empty description="No Cards" />
            </Flex>
          )}
        </Dropzone>
      </StyledWrapper>
    </>
  );
};
