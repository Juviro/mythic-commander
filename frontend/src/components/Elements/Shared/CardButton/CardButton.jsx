import React from 'react';
import styled from 'styled-components';

const StyledIcon = styled.div`
  position: absolute;
  font-size: 180%;
  z-index: 7;
  opacity: 0.5;
  top: ${({ index }) => 10 + index * 18}%;
  right: 8%;
  border-radius: 50%;
  padding: 3%;
  color: black;
  background-color: white;
`;

export default ({ Icon, index, onClick }) => {
  return <StyledIcon onClick={onClick} as={Icon} index={index} />;
};
