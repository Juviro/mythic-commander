import shimmer from 'components/Animations/shimmer';
import Flex from 'components/Elements/Shared/Flex';
import React from 'react';
import styled from 'styled-components';

const SkeletonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
`;

const StyledListItem = styled.div`
  width: 100%;
  height: 60px;
  display: flex;
`;

const StyledCardImage = styled.div`
  width: 36px;
  height: 48px;
  margin-right: 8px;
  ${shimmer};
`;

const StyledTitle = styled.div`
  height: 22px;
  margin-bottom: 5px;
  ${shimmer};
`;

const StyledDescription = styled.div`
  width: 30%;
  height: 22px;
  ${shimmer};
`;

export const CardListSkeleton = () => {
  const dummyArray = [...new Array(10)].map((_, i) => i);

  return (
    <SkeletonWrapper>
      {dummyArray.map((key) => (
        <StyledListItem key={key}>
          <StyledCardImage />
          <Flex direction="column" flex="1">
            <StyledTitle />
            <StyledDescription />
          </Flex>
        </StyledListItem>
      ))}
    </SkeletonWrapper>
  );
};
