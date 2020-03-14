import React from 'react';
import styled from 'styled-components';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { isDeckLegal, isDeckOwned } from '../../../../../utils/cardStats';

const StyledStats = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 10px;
  font-weight: 600;
  width: 80px;
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

export default ({ deck }) => {
  if (!deck.cards) return null;

  const isLegal = isDeckLegal(deck);
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
          {isValid ? <CheckOutlined /> : <CloseOutlined />} />
        </StyledStatWrapper>
      ))}
    </StyledStats>
  );
};
