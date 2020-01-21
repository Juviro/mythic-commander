import React, { useState } from 'react';
import styled from 'styled-components';
import CardLoader from './CardSpinner';

const CardWrapper = styled.div`
  height: 310px;
  width: 220px;
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
  position: absolute;
`;

export default ({ image, name }) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <CardWrapper>
      {image && <StyledImage alt={name} src={image} onLoad={() => setIsLoading(false)} />}
      {(isLoading || !image) && <CardLoader />}
    </CardWrapper>
  );
};
