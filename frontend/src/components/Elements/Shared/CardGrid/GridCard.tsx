import React from 'react';
import styled, { css } from 'styled-components';
import { useDrag } from 'react-dnd';

import { primary } from 'constants/colors';
import EnlargeImage from './EnlargeImage';
import { useToggle } from '../../../Hooks';
import CardInfo from './CardInfo';
import Card from '../Card';
import { CardMenu } from './CardMenu';
import { SelectButton } from './SelectButton';
import { Tags } from './Tags/Tags';

export const StyledCenterWrapper = styled.div<{ fixedSize: boolean }>`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  /* ${({ fixedSize }) =>
    fixedSize &&
    css`
      content-visibility: auto;
      contain-intrinsic-size: 353.8px;
    `} */
`;

const StyledCardWrapper = styled.div<{ fixedSize: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  position: relative;
  width: ${({ fixedSize }) => (fixedSize ? '220px' : '100%')};
  height: 100%;
  justify-content: space-between;
`;

const StyledImageWrapper = styled.div<{ isSelected: boolean; markAsDisabled?: boolean }>`
  position: relative;
  border-radius: 4%;
  overflow: hidden;
  background-color: white;
  width: 100%;

  ${({ markAsDisabled }) =>
    markAsDisabled
      ? css`
          opacity: 0.4;
        `
      : ''}

  ${({ isSelected }) =>
    isSelected
      ? css`
          box-shadow: 0px 0px 6px 6px ${primary};
          width: calc(100% - 8px);
          margin: 6px 0 5px;
          opacity: 0.6;
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
  onSelect,
  isSelected,
  isAnyCardSelected,
  fixedSize,
  disableSelection,
  minimal,
  onClick,
  onSetTags,
  allTags,
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
    previewOptions: {
      anchorX: 0,
      anchorY: 0,
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  const onClickCard = () => {
    if (onClick) {
      onClick(card);
      return;
    }

    if (isAnyCardSelected) {
      onSelect();
    } else if (actions.length && !showMenu) {
      toggleShowMenu(true);
    } else {
      onOpenDetails();
    }
  };

  return (
    <StyledCardWrapper key={card.id} fixedSize={fixedSize}>
      <StyledImageWrapper
        onClick={onClickCard}
        isSelected={isSelected}
        onMouseMove={(e) => {
          if (minimal) return;
          // Check for touch devices
          if (!e.movementX && !e.movementY) return;
          toggleShowMenu(true);
        }}
        onMouseLeave={() => toggleShowMenu(false)}
        markAsDisabled={markAsDisabled}
        ref={dragRef}
        onContextMenu={(e) => {
          e.preventDefault();
          if (disableSelection) return;
          onSelect();
        }}
      >
        {canZoomIn && <EnlargeImage card={card} />}
        <Card card={card} onFlipCard={() => toggleShowMenu(false)} />
        {displayedAmount > 1 && (
          <StyledAmountWrapper>{`${displayedAmount}x`}</StyledAmountWrapper>
        )}
        {Boolean(showMenu && actions.length && !isAnyCardSelected) && (
          <CardMenu
            card={card}
            actions={actions}
            onOpenDetails={onOpenDetails}
            onClose={() => toggleShowMenu(false)}
          />
        )}
        {!disableSelection && (
          <SelectButton
            onSelect={onSelect}
            isSelected={isSelected}
            isHovering={showMenu}
            isAnyCardSelected={isAnyCardSelected}
          />
        )}
      </StyledImageWrapper>
      {onSetTags && <Tags onSetTags={onSetTags} card={card} allTags={allTags} />}
      <CardInfo card={card} search={search} minimal={minimal} />
    </StyledCardWrapper>
  );
};

export default GridCard;
