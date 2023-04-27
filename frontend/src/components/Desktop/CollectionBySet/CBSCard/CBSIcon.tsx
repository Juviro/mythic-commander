import React from 'react';
import styled, { css } from 'styled-components';

import { Set } from '../../../../types/graphql';
import {
  gradientBronze,
  gradientDiamond,
  gradientGold,
  gradientIron,
  gradientSilver,
} from '../progressGradients';

const StyledBorderedCircle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 0 2px 3px rgba(0, 0, 0, 0.2);
  border-radius: 50%;
  overflow: hidden;
`;

const getProgressColorGradient = (percentageOwned: number) => {
  if (percentageOwned < 0.25) {
    return gradientIron;
  }
  if (percentageOwned < 0.5) {
    return gradientBronze;
  }
  if (percentageOwned < 0.75) {
    return gradientSilver;
  }
  if (percentageOwned < 1) {
    return gradientGold;
  }

  return gradientDiamond;
};

const StyledWrapper = styled(StyledBorderedCircle)`
  height: 90px;
  width: 90px;
  position: relative;
  box-shadow: 0 0 4px 5px rgba(0, 0, 0, 0.2);
`;

const StyledBackground = styled.div<{ percentageOwned: number }>`
  width: 100%;
  height: 100%;
  ${({ percentageOwned }) => getProgressColorGradient(percentageOwned)};
`;

const getProgressGradient = (percentageOwned: number) => {
  const percentageOwnedInDegrees = percentageOwned * 360;

  return css`
    background-image: conic-gradient(
      transparent ${percentageOwnedInDegrees}deg,
      #f9f9f9 ${percentageOwnedInDegrees}deg
    );
  `;
};

const StyledProgress = styled.div<{ percentageOwned: number }>`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  ${({ percentageOwned }) => getProgressGradient(percentageOwned)};
`;

const StyledIconWrapper = styled(StyledBorderedCircle)`
  height: 70%;
  width: 70%;
  background-color: white;
`;

const StyledSetIcon = styled.img`
  width: 50%;
  height: 50%;
`;

interface Props {
  set: Set;
  percentageOwned: number;
}

const CBSIcon = ({ set, percentageOwned }: Props) => {
  //   const percentageOwned = set.uniqueCardsOwned / set.card_count;

  return (
    <StyledWrapper>
      <StyledBackground percentageOwned={percentageOwned}>
        <StyledProgress percentageOwned={percentageOwned}>
          <StyledIconWrapper>
            <StyledSetIcon src={set.icon_svg_uri} />
          </StyledIconWrapper>
        </StyledProgress>
      </StyledBackground>
    </StyledWrapper>
  );
};

export default CBSIcon;
