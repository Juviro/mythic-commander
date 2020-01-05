import React, { useState } from 'react';
import styled from 'styled-components';
import { Icon } from 'antd';
import CardLoader from './CardSpinner';
import Card from './Card';

const CardWrapper = styled.div`
  margin: 10px;
  width: 223px;
  height: 310px;
  display: flex;
  position: relative;
  border-radius: 11px;
  align-items: center;
  justify-content: center;
  border: 1px solid #e3e3e3;
`;

const SwapIcon = styled(Icon).attrs({
  type: 'sync',
})`
  position: absolute;
  top: 40px;
  left: 23px;
  font-size: 30px;
  color: white;
  background-color: black;
  border-radius: 50%;
  padding: 5px;
  opacity: 0.6;
`;

export default ({ card, hideSwapIcon }) => {
  const isTwoFaced = !card.image_uris;
  const [currentSide, setCurrentSide] = useState(0);

  const swapSides = () => {
    setCurrentSide(currentSide ? 0 : 1);
  };

  if (!card.image_uris && !card.card_faces) {
    return (
      <CardWrapper>
        <CardLoader />
      </CardWrapper>
    );
  }

  const displayedCard = isTwoFaced ? card.card_faces[currentSide] : card;
  const imageSource = displayedCard.image_uris.normal;

  return (
    <CardWrapper>
      {imageSource && <Card name={card.name} src={imageSource} />}
      {isTwoFaced && !hideSwapIcon && <SwapIcon onClick={swapSides} />}
    </CardWrapper>
  );
};
