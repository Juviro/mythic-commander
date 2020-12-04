import { css, keyframes } from 'styled-components';

const shimmer = keyframes`
  0% {
    background-position: -468px 0;
  }
  
  100% {
    background-position: 468px 0; 
  }
`;

export default css`
  border-radius: 4%;
  background-color: #f7f7f7;
  background: linear-gradient(110deg, #f7f7f7 16%, #e6e4e4 26%, #f7f7f7 34%);
  background-size: 100rem 50rem;

  animation: ${shimmer} 2s;
  animation-fill-mode: forwards;
  animation-iteration-count: infinite;
  animation-timing-function: linear;

  box-shadow: 0 0 0.2rem 0 #f7f7f7;
`;
