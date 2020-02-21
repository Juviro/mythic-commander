import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import CardContext from '../../../CardProvider/CardProvider';

const StyledWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const StyledRow = styled.tr`
  display: flex;
  align-items: center;
  margin: 4px 0;
`;

const StyledSetIcon = styled.img`
  height: auto;
  width: 20px;
  margin: 0 8px;
`;

const StyledCardPreview = styled.img`
  height: 36px;
  width: auto;
`;

const StyledAmount = styled.td`
  min-width: 100px;
`;

export default ({ cards, isOpen }) => {
  const { sets } = useContext(CardContext);
  const [isEditing, setIsEditing] = useState(false);
  const ownedCards = cards.filter(
    ({ amount, amountFoil }) => amount + amountFoil
  );

  console.table(ownedCards);

  return (
    <StyledWrapper isOpen={isOpen}>
      <table>
        {ownedCards.map(({ id, set, image_uris, amount, amountFoil }) => (
          <StyledRow key={id}>
            <StyledAmount>
              <StyledCardPreview src={image_uris[0].small} />
              <StyledSetIcon src={sets[set].icon_svg_uri} />
            </StyledAmount>
            <StyledAmount>{Boolean(amount) && `${amount}x`}</StyledAmount>
            <StyledAmount>
              {Boolean(amountFoil) && `${amountFoil}x foil`}
            </StyledAmount>
          </StyledRow>
        ))}
      </table>
    </StyledWrapper>
  );
};
