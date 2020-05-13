import React, { useRef, useEffect } from 'react';
import styled, { css } from 'styled-components';

import { getImageUrl } from '../../../../../../utils/cardImage';
import { primary } from '../../../../../../constants/colors';
import scrollIntoView from '../../../../../../utils/scrollIntoView';
import CardMenu from './CardMenu';

export const CARD_WIDTH = 220;
const CARD_HEIGHT = CARD_WIDTH * 1.4;

const ANIMATION_DURATION = 100;

const StyledWrapper = styled.div`
  left: 0;
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
`;

const StyledScrollDummy = styled.div`
  position: absolute;
  width: 100%;
  height: 125%;
  top: -15%;
  z-index: -1;
  user-select: none;
`;

const StyledCard = styled.img`
  width: 100%;
  height: ${CARD_HEIGHT}px;
  border-radius: 4%;
  cursor: pointer;
  background-color: grey;
  border: 1px solid black;
  ${({ isSelected }) =>
    isSelected
      ? css`
          box-shadow: 0px 0px 6px 6px ${primary};
        `
      : ''}
`;

export default ({ card, isSelected, onOpenDetails, setSelectedCardId }) => {
  const ref = useRef(null);

  const onClick = () => {
    const newSelectedCardId = isSelected ? null : card.id;
    setSelectedCardId(newSelectedCardId);
  };

  useEffect(() => {
    if (!isSelected || !ref) return;
    setTimeout(() => scrollIntoView(ref.current), ANIMATION_DURATION);
  }, [isSelected]);

  return (
    <StyledWrapper isSelected={isSelected}>
      <StyledScrollDummy ref={ref} />
      <StyledCard
        onClick={onClick}
        isSelected={isSelected}
        src={getImageUrl(card.id, card.imgKey, 'normal')}
      />
      {isSelected && <CardMenu card={card} onOpenDetails={onOpenDetails} />}
    </StyledWrapper>
  );
};
