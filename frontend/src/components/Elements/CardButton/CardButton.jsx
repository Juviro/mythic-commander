import React from 'react';
import styled from 'styled-components';

export default ({ Icon, index, onClick }) => {
  const StyledIcon = styled(Icon)`
    position: absolute;
    font-size: 180%;
    z-index: 10;
    opacity: 0.5;
    top: ${10 + index * 18}%;
    right: 8%;
    border-radius: 50%;
    padding: 3%;
    color: black;
    background-color: white;
  `;

  return <StyledIcon onClick={onClick} />;
};
