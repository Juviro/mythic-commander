import React from 'react';
import { List, Typography } from 'antd';
import styled from 'styled-components';

import { isCardLegal } from '../../../../../../utils/cardStats';

const StyledListItem = styled(List.Item)`
  padding: 2px 4px;
  margin: 2px 4px;
  border-radius: 4px;
  ${({ isLegal }) => (!isLegal ? 'background-color: #ffcfcf;' : '')}
`;

const Left = styled.div`
  display: flex;
  flex-direction: row;
  width: 90%;
`;

const StyledCardWrapper = styled.div`
  display: flex;
  width: 100%;
  line-height: 36px;
  flex-direction: row;
  justify-content: space-between;
`;

const StyledName = styled(Typography.Text)`
  left: 46px;
  font-size: 14;
  position: absolute;
  transition: all 0.2s;
  width: calc(100% - 90px);
  ${({ isOpen }) => (isOpen ? 'left: 12px' : '')}
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

  return <StyledCard src={images[0].normal} isLarge={isOpen} />;
};

export default ({ card, commander, setOpenCardId, isOpen }) => {
  const toggleIsOpen = () => setOpenCardId(isOpen ? null : card.id);

  return (
    <StyledListItem isLegal={isCardLegal(card, commander)}>
      <StyledCardWrapper onClick={toggleIsOpen}>
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
