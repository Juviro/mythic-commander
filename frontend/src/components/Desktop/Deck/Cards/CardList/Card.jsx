import React, { useRef, useEffect, useContext } from 'react';
import styled, { css } from 'styled-components';

import { useDrag } from 'react-dnd';
import { useParams } from 'react-router';
import { useToggle } from 'components/Hooks';
import shimmer from 'components/Animations/shimmer';
import { primary } from '../../../../../constants/colors';
import scrollIntoView from '../../../../../utils/scrollIntoView';
import CardMenu from './CardMenu';
import { FlippableCard, AmountBadge } from '../../../../Elements/Shared';
import FocusContext from '../../../../Provider/FocusProvider/FocusProvider';

export const CARD_WIDTH = 220;
const CARD_HEIGHT = CARD_WIDTH * 1.4;

const ANIMATION_DURATION = 100;

const StyledSlicedCard = styled.div`
  height: ${({ isFullSize }) => (isFullSize ? '100%' : '46px')};
  width: 100%;
  overflow: hidden;
`;

const StyledWrapper = styled.div`
  width: ${CARD_WIDTH}px;

  position: relative;
  user-select: none;

  transition: margin-bottom ${ANIMATION_DURATION}ms;

  ${({ isSelected }) =>
    isSelected
      ? css`
          &:not(:last-child) {
            margin-bottom: 130%;
          }
        `
      : ''}

  &:not(:first-child) {
    margin-top: ${40 - CARD_HEIGHT}px;
  }

  &:last-child ${StyledSlicedCard} {
    height: 100%;
  }
`;

const StyledScrollDummy = styled.div`
  position: absolute;
  width: 100%;
  height: 128%;
  top: -15%;
  z-index: -1;
  user-select: none;
`;

const StyledCard = styled.div`
  width: 100%;
  height: ${CARD_HEIGHT}px;
  border-radius: 4%;
  cursor: pointer;
  ${shimmer};
  border: 1px solid black;
  overflow: hidden;
  position: relative;
  opacity: ${({ isTransparent }) => (isTransparent ? 0.1 : 1)};
  transition: opacity 0.5s;

  ${({ isSelected }) =>
    isSelected
      ? css`
          box-shadow: 0px 0px 6px 6px ${primary};
          opacity: ${({ isTransparent }) => (isTransparent ? 0.6 : 1)};
        `
      : ''}
  ${({ isHighlighted }) =>
    isHighlighted
      ? css`
          z-index: 1;
        `
      : ''}
`;

const StyledCardWrapper = styled.div`
  height: ${CARD_HEIGHT - 2}px;
  width: 100%;
`;

const Card = ({
  card,
  isSelected,
  onOpenDetails,
  setSelectedCardOracleId,
  onDelete,
  displayOwnedOnly,
  onDeleteImmediately,
}) => {
  // console.log('displayOwnedOnly', displayOwnedOnly);
  const { id: deckId } = useParams();
  const { focusedElement } = useContext(FocusContext);
  const [isHighlighted, toggleIsHighlighted] = useToggle();
  const isFocused = focusedElement !== 'deck.sidebar';

  const selected = isSelected && isFocused;
  const ref = useRef(null);

  const onClick = () => {
    const newSelectedCardOracleId = selected ? null : card.oracle_id;
    setSelectedCardOracleId(newSelectedCardOracleId);
  };

  useEffect(() => {
    if (!selected || !ref) return;
    setTimeout(() => scrollIntoView(ref.current), ANIMATION_DURATION);
  }, [selected]);

  const [, dragRef] = useDrag({
    item: {
      type: 'CARD',
      id: card.id,
      name: card.name,
      listId: deckId,
      amount: card.amount,
    },
    end: (_, monitor) => {
      if (!monitor.didDrop()) return;
      onDeleteImmediately(card.id);
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  const isTransparent = displayOwnedOnly && card.owned && !selected;

  return (
    <StyledWrapper
      isSelected={selected}
      onDragStart={() => toggleIsHighlighted(true)}
      onDragEnd={() => toggleIsHighlighted(false)}
    >
      <StyledScrollDummy ref={ref} />
      <StyledCard
        ref={dragRef}
        onClick={onClick}
        isSelected={selected}
        isTransparent={isTransparent}
        isHighlighted={isHighlighted}
      >
        <StyledSlicedCard isFullSize={selected || displayOwnedOnly}>
          <StyledCardWrapper>
            <FlippableCard
              card={card}
              hideFlipIcon={!selected}
              lazyLoadProps={{
                offset: 100,
                overflow: true,
              }}
            />
          </StyledCardWrapper>
        </StyledSlicedCard>
        <AmountBadge amount={card.amount} />
      </StyledCard>
      {selected && (
        <CardMenu card={card} onOpenDetails={onOpenDetails} onDelete={onDelete} />
      )}
    </StyledWrapper>
  );
};

const areEqual = (prevProps, nextProps) => {
  if (prevProps.isSelected !== nextProps.isSelected) return false;
  if (prevProps.displayOwnedOnly !== nextProps.displayOwnedOnly) return false;

  return ['id', 'amount', 'owned', 'sumPrice', 'minPrice'].every(
    (propKey) => prevProps.card[propKey] === nextProps.card[propKey]
  );
};

export default React.memo(Card, areEqual);
