import shimmer from 'components/Animations/shimmer';
import {
  GRID_CARD_WIDTH,
  StyledCardGridWrapper,
} from 'components/Elements/Shared/CardGrid/CardGrid';
import { StyledCenterWrapper } from 'components/Elements/Shared/CardGrid/GridCard';
import React from 'react';
import styled from 'styled-components';

const StyledPaginationPlaceholder = styled.div`
  width: 100%;
  height: 56px;
`;

const StyledElement = styled.div<{ fixedSize: boolean }>`
  display: flex;
  flex-direction: column;
  width: ${({ fixedSize }) => (fixedSize ? `${GRID_CARD_WIDTH}px` : '100%')};
`;

const StyledCard = styled.div<{ large: boolean }>`
  width: 100%;
  height: 0;
  padding-bottom: 139%;
  border-radius: 3%;
  ${shimmer}
`;

const StyledDescription = styled.div<{ small?: boolean }>`
  width: ${({ small }) => (small ? '40%' : `${GRID_CARD_WIDTH}px`)};
  height: 22px;
  margin-top: 5px;
  ${shimmer};
`;

interface Props {
  large?: boolean;
  cardsPerRow?: number;
  showPagination?: boolean;
  numberOfElements?: number;
}

export const CardGridSkeleton = ({
  large,
  cardsPerRow,
  showPagination,
  numberOfElements = 20,
}: Props) => {
  const dummyElements = [...new Array(numberOfElements)].map((_, i) => i);
  const fixedSize = !cardsPerRow;

  return (
    <>
      {showPagination && <StyledPaginationPlaceholder />}
      <StyledCardGridWrapper cardsPerRow={cardsPerRow}>
        {dummyElements.map((key) => (
          <StyledCenterWrapper key={key} fixedSize={fixedSize}>
            <StyledElement fixedSize={fixedSize}>
              <StyledCard large={large} />
              <StyledDescription />
              <StyledDescription small />
            </StyledElement>
          </StyledCenterWrapper>
        ))}
      </StyledCardGridWrapper>
    </>
  );
};
