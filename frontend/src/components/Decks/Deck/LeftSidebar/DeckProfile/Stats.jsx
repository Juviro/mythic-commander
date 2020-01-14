import React from 'react';
import styled from 'styled-components';
import { Icon } from 'antd';

const StyledStats = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 10px;
  font-weight: 600;
`;

const StyledStatWrapper = styled.div`
  display: flex;
  align-items: center;
  font-size: 12px;
  margin: 0 0 10px 5px;
  justify-content: space-between;
  width: 100%;
  color: ${({ isValid }) => (isValid ? 'green' : 'red')};
`;

const StyledTitle = styled.span`
  margin-left: 5px;
`;

export const isCardLegal = (card, commander) => {
  const { color_identity, legalities } = card;
  const isLegal = !legalities.commander || legalities.commander === 'legal';
  if (!commander) return isLegal;

  const rightColorIdentity = !color_identity || color_identity.every(color => commander.color_identity.includes(color));

  return rightColorIdentity && isLegal;
};

const isDeckLegal = cards => {
  const commander = cards.find(({ zone }) => zone === 'COMMANDER');

  return cards.every(card => isCardLegal(card, commander));
};

const isDeckOwned = ({ cards }) => {
  return cards.every(({ owned }) => owned);
};

export default ({ deck }) => {
  if (!deck.cards) return null;

  const isLegal = isDeckLegal(deck.cards);
  const isOwned = isDeckOwned(deck);

  const stats = [
    {
      title: `${deck.cards.length}/100`,
      isValid: deck.cards.length === 100,
    },
    {
      title: `${!isLegal ? 'not ' : ''}legal`,
      isValid: isLegal,
    },
    {
      title: `${!isOwned ? 'un' : ''}owned`,
      isValid: isOwned,
    },
  ];

  return (
    <StyledStats>
      {stats.map(({ title, isValid }) => (
        <StyledStatWrapper key={title} isValid={isValid}>
          <StyledTitle>{title}</StyledTitle>
          <Icon type={isValid ? 'check' : 'close'} />
        </StyledStatWrapper>
      ))}
    </StyledStats>
  );
};
