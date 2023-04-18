import React from 'react';
import styled from 'styled-components';

const StyledIcon = styled.div`
  position: ${({ relative }) => (relative ? 'relative' : 'absolute')};
  font-size: ${({ size }) => size};
  z-index: ${({ zindex }) => zindex};
  opacity: 0.5;
  top: ${({ index }) => 10 + index * 18}%;
  right: 8%;
  border-radius: 50%;
  padding: 3%;
  color: black;
  background-color: white;
`;

export default ({
  Icon,
  index,
  size = '180%',
  onClick,
  zIndex = 7,
  relative = false,
}) => {
  return (
    <StyledIcon
      onClick={onClick}
      as={Icon}
      size={size}
      index={index}
      zindex={zIndex}
      relative={relative ? 1 : 0}
    />
  );
};
