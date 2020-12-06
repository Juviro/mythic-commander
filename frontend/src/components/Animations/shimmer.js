import { css, keyframes } from 'styled-components';

const shimmer = keyframes`
  0%,
  100% {
    background-position: 0 50%;
  }
  50% {
    background-position: 100% 50%;
  }
`;

export default css`
  background: linear-gradient(
    90deg,
    rgba(207, 216, 220, 0.2),
    rgba(207, 216, 220, 0.4),
    rgba(207, 216, 220, 0.2)
  );
  background-size: 600% 600%;

  animation: ${shimmer} 1.4s;
  animation-fill-mode: forwards;
  animation-iteration-count: infinite;
  animation-timing-function: linear;

  box-shadow: 0 0 0.2rem 0 #f7f7f7;
`;
