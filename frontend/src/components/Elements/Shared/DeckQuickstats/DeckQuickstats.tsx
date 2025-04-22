/* eslint-disable max-len */
import { Space } from 'antd';
import shimmer from 'components/Animations/shimmer';
import UserContext from 'components/Provider/UserProvider';
import React, { useContext } from 'react';
import styled from 'styled-components';
import { UnifiedDeck } from 'types/unifiedTypes';
import { hasCorrectColorIdentity } from 'utils/cardStats';
import { getListStats } from 'utils/getListStats';
import sumCardAmount from 'utils/sumCardAmount';
import { DeckQuickstatsItem } from './DeckQuickstatsItem';

const StyledPlaceholder = styled.div`
  ${shimmer};
  width: 200px;
  height: 28px;
`;

const getQuickstats = (deck: UnifiedDeck, type: string) => {
  switch (type) {
    case 'numberOfCards': {
      const has100Cards = sumCardAmount(deck.cards) === 100;
      return {
        type,
        text: `${sumCardAmount(deck.cards)} Card${sumCardAmount(deck.cards) > 1 ? 's' : ''}`,
        status: has100Cards ? 'ok' : 'error',
      };
    }
    case 'owned': {
      const { numberOfUnownedCards } = getListStats(deck);
      if (!numberOfUnownedCards) {
        return { type, text: 'All cards collected', status: 'ok' };
      }

      const cards = deck.cards.filter(({ owned }) => !owned);
      return {
        type,
        text: `${numberOfUnownedCards} Card${numberOfUnownedCards > 1 ? 's' : ''} Not Collected`,
        status: 'warning',
        cards,
      };
    }
    case 'colorIdentity': {
      const commanders = deck.cards.filter(({ isCommander }) => isCommander);
      if (!commanders.length) {
        return { type, text: 'No Commander Selected', status: 'warning' };
      }

      const colorIdentityErrorCards = deck.cards.filter(
        (card) => !hasCorrectColorIdentity(card, commanders)
      );

      if (!colorIdentityErrorCards.length) {
        return { type, text: 'Color Identity', status: 'ok' };
      }

      return {
        type,
        text: `Color Identity (${colorIdentityErrorCards.length})`,
        status: 'error',
        cards: colorIdentityErrorCards,
      };
    }
    case 'commanderLegal': {
      const illegalCards = deck.cards.filter(({ isCommanderLegal }) => !isCommanderLegal);

      return {
        type,
        text: illegalCards.length
          ? `Commander Legal (${illegalCards.length})`
          : 'Card Legality',
        status: illegalCards.length ? 'error' : 'ok',
        cards: illegalCards,
      };
    }
    default:
      return null;
  }
};

interface Props {
  deck: UnifiedDeck;
}

export const DeckQuickstats = ({ deck }: Props) => {
  const { user } = useContext(UserContext);
  if (!deck) {
    return (
      <Space direction="vertical">
        {[...new Array(4)].map((_, index) => (
          <StyledPlaceholder key={index} />
        ))}
      </Space>
    );
  }

  const quickstats = [
    getQuickstats(deck, 'numberOfCards'),
    getQuickstats(deck, 'commanderLegal'),
    getQuickstats(deck, 'colorIdentity'),
  ];

  if (user) {
    quickstats.push(getQuickstats(deck, 'owned'));
  }

  return (
    <Space direction="vertical">
      {quickstats.map(({ text, status, type, cards }) => (
        <DeckQuickstatsItem text={text} status={status} key={type} cards={cards} />
      ))}
    </Space>
  );
};
