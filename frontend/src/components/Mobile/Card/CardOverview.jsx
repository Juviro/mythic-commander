import React from 'react';
import styled from 'styled-components';

const StyledCardImage = styled.img`
  width: 90%;
  height: auto;
  margin-top: 16px;
`;

export default ({ card }) => {
  const imgSrc = (card.image_uris || card.card_faces[0].image_uris).normal;

  return (
    <>
      <StyledCardImage src={imgSrc} />
    </>
  );
};
