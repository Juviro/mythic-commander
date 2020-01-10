import React from 'react';
import styled from 'styled-components';
import Card from '../../Card';

const StyledCardPreview = styled.div`
  display: flex;
  flex-direction: column;
`;

const ImageWrapper = styled.div`
  height: 330px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const getCardInfo = card => {
  const { name } = card;
  const isTwoFaced = !card.image_uris;
  return isTwoFaced
    ? card.card_faces.map((face, index) => ({
        name: `${name} face ${index}`,
        image: face.image_uris.normal,
      }))
    : [{ name, image: card.image_uris.normal }];
};

export default ({ highlightedCard }) => {
  if (!highlightedCard) return <StyledCardPreview />;

  const cardInfos = getCardInfo(highlightedCard);

  return (
    <ImageWrapper>
      {cardInfos.map(card => (
        <Card key={card.image} {...card} size={cardInfos.length === 1 ? 'normal' : 'small'} />
      ))}
    </ImageWrapper>
  );
};
