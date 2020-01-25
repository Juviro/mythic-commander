import React, { useState } from 'react';
import { List, Typography } from 'antd';
import styled from 'styled-components';

import { isCardLegal } from '../../../../../../utils/cardStats';

const StyledListItem = styled(List.Item)`
  padding: 4px 8px;
`;

const Left = styled.div`
  display: flex;
  flex-direction: row;
  width: 90%;
  line-height: 36px;
`;

const StyledCardWrapper = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;

  ${({ isLegal }) => (!isLegal ? 'background-color: #ffcfcf;' : '')}
`;

const StyledName = styled(Typography.Text)`
  /* top: 6px; */
  left: 46px;
  width: 100%;
  font-size: 14;
  position: absolute;
  transition: all 0.2s;
  ${({ isOpen }) => (isOpen ? 'left: 16px' : '')}
`;

const StyledCard = styled.img`
  height: 36px;
  width: 26px;
  transition: all 0.2s;

  ${({ isLarge }) => {
    if (!isLarge) return '';
    return `
      height: 252px;
      width: 182px;
      margin-top: 32px;
    `;
  }}
`;

const CardImage = ({ card, isOpen }) => {
  const images = card.image_uris ? [card.image_uris] : card.card_faces.map(({ image_uris }) => image_uris);
  console.log('images :', images);
  // if(!images[0].small) return null;

  return <StyledCard src={images[0].normal} isLarge={isOpen} />;
};

export default ({ card, commander }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleIsOpen = () => setIsOpen(!isOpen);

  return (
    <StyledListItem>
      <StyledCardWrapper onClick={toggleIsOpen} isLegal={isCardLegal(card, commander)}>
        <Left>
          <CardImage card={card} isOpen={isOpen} />
          <StyledName ellipsis isOpen={isOpen}>
            {card.name}
          </StyledName>
        </Left>
        {card.amount > 1 && <span>{`${card.amount}x`}</span>}
      </StyledCardWrapper>
    </StyledListItem>
  );
};
