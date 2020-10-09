import React from 'react';
import LazyLoad from 'react-lazyload';
import styled from 'styled-components';
import { fadeIn } from '../../../Animations';

const StyledFadeInWrapper = styled.div`
  width: 100%;
  height: 100%;
  animation: ${fadeIn} ${({ animationDuration }) => animationDuration}s ease-out;
`;

export default ({ children, animationDuration, ...props }) => {
  return (
    <LazyLoad {...props} width="100%">
      <StyledFadeInWrapper animationDuration={animationDuration}>
        {children}
      </StyledFadeInWrapper>
    </LazyLoad>
  );
};
