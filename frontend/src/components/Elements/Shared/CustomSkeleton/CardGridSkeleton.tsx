import shimmer from 'components/Animations/shimmer';
import { StyledCardGridWrapper } from 'components/Elements/Desktop/PaginatedCardList/CardGrid/CardGrid';
import React from 'react';
import styled from 'styled-components';

const StyledElement = styled.div`
  margin-bottom: 12px;
  display: flex;
  flex-direction: column;
`;

const StyledCard = styled.div<{ large?: boolean }>`
  width: 100%;
  height: 100%;
  border-radius: 3%;
  ${shimmer}
`;

const StyledDescription = styled.div<{ small?: boolean }>`
  width: ${({ small }) => (small ? 40 : 100)}%;
  height: 22px;
  margin-top: 5px;
  ${shimmer};
`;

interface Props {
  large?: boolean;
}

export const CardGridSkeleton = ({ large }: Props) => {
  const dummyElements = [...new Array(10)].map((_, i) => i);

  return (
    <StyledCardGridWrapper>
      {dummyElements.map((key) => (
        <StyledElement key={key}>
          <StyledCard large={large} />
          <StyledDescription />
          <StyledDescription small />
        </StyledElement>
      ))}
    </StyledCardGridWrapper>
  );
};
