import shimmer from 'components/Animations/shimmer';
import React from 'react';
import styled from 'styled-components';

const StyledWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const StyledElement = styled.div`
  margin-bottom: 12px;
  display: flex;
  flex-direction: column;
`;

const StyledCard = styled.div<{ large?: boolean }>`
  width: ${({ large }) => (large ? 90 : 43)}vw;
  height: ${({ large }) => (large ? 125 : 60)}vw;
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

export const MobileCardGridSkeleton = ({ large }: Props) => {
  const dummyElements = [...new Array(10)].map((_, i) => i);

  return (
    <StyledWrapper>
      {dummyElements.map((key) => (
        <StyledElement key={key}>
          <StyledCard large={large} />
          <StyledDescription />
          <StyledDescription small />
        </StyledElement>
      ))}
    </StyledWrapper>
  );
};
