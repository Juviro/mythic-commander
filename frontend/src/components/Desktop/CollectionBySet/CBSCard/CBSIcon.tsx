import React, { useRef } from 'react';
import styled, { css, keyframes } from 'styled-components';

import { Set } from '../../../../types/graphql';
import {
  gradientBronze,
  gradientDiamond,
  gradientGold,
  gradientIron,
  gradientSilver,
} from '../progressGradients';
import { useAnimateOnAppearance } from '../../../../hooks/useAnimateOnAppearance';

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
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  ${({ percentageOwned }) => getProgressColorGradient(percentageOwned)};
`;

const getProgressGradient = (percentageOwned: number) => {
  const percentageOwnedInDegrees = percentageOwned * 360;
  const animationDurationSeconds = 1.5 * (percentageOwned * 0.5 + 0.5);

  const animation = keyframes`
    from {
      --progress: 0deg;
    }
    to {
      --progress: ${percentageOwnedInDegrees}deg;
    }
  `;

  return css`
    @property --progress {
      syntax: '<angle>';
      inherits: false;
      initial-value: 0deg;
    }

    animation: ${animation} ${animationDurationSeconds}s ease-in-out;
    --progress: ${percentageOwnedInDegrees}deg;

    background-image: conic-gradient(
      transparent var(--progress),
      #f9f9f9 var(--progress)
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
  position: absolute;
  z-index: 1;
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
  const wrapperRef = useRef<HTMLDivElement>(null);
  const isVisible = useAnimateOnAppearance(wrapperRef);

  return (
    <StyledWrapper ref={wrapperRef}>
      {isVisible && (
        <StyledBackground percentageOwned={percentageOwned}>
          <StyledProgress percentageOwned={percentageOwned} />
        </StyledBackground>
      )}
      <StyledIconWrapper>
        <StyledSetIcon src={set.icon_svg_uri} />
      </StyledIconWrapper>
    </StyledWrapper>
  );
};

export default CBSIcon;
