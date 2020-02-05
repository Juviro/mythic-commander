import React from 'react';
import styled from 'styled-components';

const StyledCardImage = styled.img`
  width: 90%;
  height: auto;
  margin-top: 16px;
`;

export default ({ card }) => {
  //   console.log('card :', card);
  const imgSrc = (card.card_faces ? card.card_faces[0] : card).image_uris
    .normal;
  //   console.log('imgSrc :', imgSrc);

  return (
    <>
      <StyledCardImage src={imgSrc} />
    </>
  );
};
