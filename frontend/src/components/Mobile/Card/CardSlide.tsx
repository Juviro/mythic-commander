import React from 'react';
import styled from 'styled-components';

import Card from '.';
import { UnifiedCard } from '../../../types/unifiedTypes';
import CardImage from './CardImage';

const StyledSlideSnapper = styled.div`
  scroll-snap-align: start;
  height: 100%;
`;

const StyledSlide = styled.div`
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

interface Props {
  card: UnifiedCard;
  displayDetails?: boolean;
  cardRef?: React.RefObject<HTMLDivElement>;
}

const CardSlide = ({ card, displayDetails, cardRef }: Props) => {
  if (!card) return null;

  return (
    <StyledSlideSnapper ref={cardRef}>
      <StyledSlide>
        {displayDetails ? (
          <Card overwriteOracleId={card.oracle_id} defaultCardId={card.id} />
        ) : (
          <CardImage card={card} loading={!card} />
        )}
      </StyledSlide>
    </StyledSlideSnapper>
  );
};

export default CardSlide;
