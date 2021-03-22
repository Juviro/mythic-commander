import React from 'react';
import styled, { css } from 'styled-components';
import { useDrag } from 'react-dnd';

import EnlargeImage from 'components/Elements/Shared/CardGrid/EnlargeImage';
import FlippableCard from '../FlippableCard';
import { useToggle } from '../../../Hooks';
import CardInfo from './CardInfo';
import { CardMenu } from './CardMenu';

const StyledCenterWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledCardWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  position: relative;
  width: 100%;
  height: 100%;
`;

const StyledImageWrapper = styled.div<{ markAsDisabled?: boolean }>`
  position: relative;
  border-radius: 4%;
  overflow: hidden;
  background-color: white;
  width: 100%;
  height: 100%;

  ${({ markAsDisabled }) =>
    markAsDisabled
      ? css`
          opacity: 0.4;
        `
      : ''}
`;

const StyledAmountWrapper = styled.div`
  padding: 1% 12px;
  position: absolute;
  background-color: #aebde6;
  opacity: 0.8;
  bottom: 0;
  align-self: flex-start;
  border-top-right-radius: 8px;
  border-bottom-left-radius: 8px;
`;

const GridCard = ({
  card,
  onOpenDetails,
  actions = [],
  search,
  markAsDisabled,
  dragProps,
  canZoomIn,
}) => {
  const { canDrag = false, listId, onSuccessfullDrop } = dragProps ?? {};
  const displayedAmount = card.amount || card.totalAmount;
  const [showMenu, toggleShowMenu] = useToggle();

  const [, dragRef] = useDrag({
    item: { type: 'CARD', id: card.id, name: card.name, listId, amount: card.amount },
    canDrag,
    end: (_, monitor) => {
      if (monitor.didDrop() && onSuccessfullDrop) {
        onSuccessfullDrop(card);
      }
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  const onClick =
    actions.length && !showMenu ? () => toggleShowMenu(true) : onOpenDetails;

  return (
    <StyledCenterWrapper>
      <StyledCardWrapper key={card.id}>
        <StyledImageWrapper
          onClick={onClick}
          onMouseMove={(e) => {
            if (!e.movementX && !e.movementY) return;
            toggleShowMenu(true);
          }}
          onMouseLeave={() => toggleShowMenu(false)}
          markAsDisabled={markAsDisabled}
          ref={dragRef}
        >
          {canZoomIn && <EnlargeImage card={card} />}
          <FlippableCard card={card} />
          {displayedAmount > 1 && (
            <StyledAmountWrapper>{`${displayedAmount}x`}</StyledAmountWrapper>
          )}
          {Boolean(showMenu && actions.length) && (
            <CardMenu
              card={card}
              actions={actions}
              onOpenDetails={onOpenDetails}
              onClose={() => toggleShowMenu(false)}
            />
          )}
        </StyledImageWrapper>
        <CardInfo card={card} search={search} />
      </StyledCardWrapper>
    </StyledCenterWrapper>
  );
};

// const areEqual = (prevProps, nextProps) => {
//   if (prevProps.isSelected !== nextProps.isSelected) return false;
//   if (prevProps.widthPercentage !== nextProps.widthPercentage) return false;
//   if (prevProps.width !== nextProps.width) return false;
//   if (prevProps.loading !== nextProps.loading) return false;
//   if (prevProps.index !== nextProps.index) return false;
//   if (prevProps.search !== nextProps.search) return false;
//   if (prevProps.shortcutsActive !== nextProps.shortcutsActive) return false;
//   if (prevProps.markAsDisabled !== nextProps.markAsDisabled) return false;
//   if (prevProps.canZoomIn !== nextProps.markAsDisabled) return false;

//   return [
//     'id',
//     'amount',
//     'owned',
//     'totalAmount',
//     'sumPriceEur',
//     'sumPriceUsd',
//     'minPriceEur',
//     'minPriceUsd',
//   ].every((propKey) => prevProps.card[propKey] === nextProps.card[propKey]);
// };

export default GridCard;
