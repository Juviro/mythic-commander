import React, { useState } from 'react';
import styled from 'styled-components';
import CardLoader from './CardSpinner';

const sizes = {
  normal: {
    width: 220,
    height: 310,
  },
  small: {
    width: 110,
    height: 155,
  },
};

const CardWrapper = styled.div`
  height: ${({ size }) => sizes[size].height}px;
  width: ${({ size }) => sizes[size].width}px;
  display: flex;
  position: relative;
  border-radius: 11px;
  align-items: center;
  justify-content: center;
  border: 1px solid #e3e3e3;
`;

const StyledImage = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 10px;
`;

export default ({ image, name, size = 'normal' }) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <CardWrapper size={size}>
      {image && <StyledImage alt={name} src={image} onLoad={() => setIsLoading(false)} />}
      {(isLoading || !image) && <CardLoader />}
    </CardWrapper>
  );
};
