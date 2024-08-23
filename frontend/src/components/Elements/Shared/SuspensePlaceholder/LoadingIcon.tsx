import React from 'react';
import styled, { keyframes } from 'styled-components';

const rotate = keyframes`
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
    `;

const StyledSvg = styled.svg`
  width: 50vw;
  height: 50vw;
  max-width: 300px;
  max-height: 300px;

  & #circle {
    transform-origin: center;
    animation: ${rotate} 1s linear infinite;
  }
`;

const LoadingIcon = () => {
  return (
    <StyledSvg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 64 64"
      width="64"
      height="64"
    >
      <rect width="64" height="64" fill="none" />
      <defs>
        <linearGradient id="customGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop
            offset="0%"
            style={{
              stopColor: 'rgb(252, 113, 7)',
              stopOpacity: 1,
            }}
          />
          <stop
            offset="50%"
            style={{
              stopColor: 'rgb(246, 151, 29)',
              stopOpacity: 1,
            }}
          />
          <stop
            offset="100%"
            style={{
              stopColor: 'rgb(253, 97, 25)',
              stopOpacity: 1,
            }}
          />
        </linearGradient>
      </defs>
      <circle
        cx="50%"
        cy="50%"
        r="30"
        id="circle"
        stroke="url(#customGradient)"
        fill="transparent"
        strokeWidth="4"
      />

      <text
        x="50%"
        y="50%"
        fontSize="48"
        fontFamily="Arial, sans-serif"
        fontWeight="bold"
        fill="url(#customGradient)"
        textAnchor="middle"
        dy=".35em"
      >
        M
      </text>
    </StyledSvg>
  );
};

export default LoadingIcon;
