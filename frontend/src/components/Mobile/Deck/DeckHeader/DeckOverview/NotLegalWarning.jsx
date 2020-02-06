import React from 'react';
import styled from 'styled-components';
import { Icon, Popover } from 'antd';
import { isDeckLegal, isDeckOwned } from '../../../../../utils/cardStats';
import { getNumberOfCards } from '../../../../../utils/deck';

const StyledIssuesBox = styled.div`
  padding: 8px;
  display: flex;
  flex-direction: column;
`;

const messages = {
  isLegal:
    "• Not all cards are commander legal or in the commander's color identity",
  isOwned: "• You don't own all cards in this deck",
  has100Cards: '• This deck does not contain exactly 100 cards',
};

export default ({ deck }) => {
  const isLegal = isDeckLegal(deck);
  const isOwned = isDeckOwned(deck);
  const has100Cards = getNumberOfCards(deck.cards) === 100;
  const showWarning = !isLegal || !isOwned || !has100Cards;

  if (!showWarning) return null;

  const renderIssues = (
    <StyledIssuesBox>
      {!isLegal && <span>{messages.isLegal}</span>}
      {!isOwned && <span>{messages.isOwned}</span>}
      {!has100Cards && <span>{messages.has100Cards}</span>}
    </StyledIssuesBox>
  );

  return (
    <Popover
      placement="bottomRight"
      title="This deck is not yet playable:"
      content={renderIssues}
      trigger="click"
    >
      <Icon
        type="exclamation-circle"
        style={{ color: 'orange', fontSize: 16 }}
      />
    </Popover>
  );
};
