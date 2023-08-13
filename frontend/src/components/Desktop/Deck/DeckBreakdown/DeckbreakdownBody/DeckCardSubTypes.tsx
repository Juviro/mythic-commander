import React, { useContext } from 'react';
import styled, { css } from 'styled-components';

import { UnifiedDeck } from 'types/unifiedTypes';
import CardContext from 'components/Provider/CardProvider/CardProvider';
import {
  CardType,
  CARD_TYPE_DECK_ORDER,
} from 'components/Provider/CardProvider/staticTypes';

const highlightOnHover = css`
  transition: background-color 0.1s ease-out;
  cursor: default;

  &:hover {
    background-color: #eee;
  }
`;

const StyledList = styled.ol`
  list-style: none;
  padding: 0;
`;

const StyledTitle = styled.h3`
  margin: 0 0 0 -8px;
  padding: 0 16px 0 8px;
  font-size: 16px;
  display: flex;
  justify-content: space-between;
  ${highlightOnHover}
`;

const StyledAmount = styled.span`
  font-size: 14px;
`;

const StyledEntry = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 16px 0 24px;
  margin-left: -8px;
  ${highlightOnHover}
`;

interface Props {
  deck: UnifiedDeck;
  cardsbyTypeWithAmount: { name: CardType; amount: number }[];
}

const DeckCardSubTypes = ({ deck, cardsbyTypeWithAmount }: Props) => {
  const { subTypesMap } = useContext(CardContext);

  const getMatchingSupertype = (subType: string, primaryTypes: string[]): CardType => {
    const isTribalSpell = primaryTypes.includes('Tribal');
    // these types are merged as "Spell" in the subTypesMap, but we want to split them up
    const isInstantOrSorcery = primaryTypes.some((type) =>
      ['Instant', 'Sorcery'].includes(type)
    );
    if (isTribalSpell || isInstantOrSorcery) {
      return primaryTypes.at(-1) as CardType;
    }

    return subTypesMap[subType];
  };

  const subtypesBySupertype = deck?.cards?.reduce((acc, card) => {
    if (!card.subTypes.length) return acc;

    card.subTypes.forEach((subType) => {
      const matchingSupertype = getMatchingSupertype(subType, card.primaryTypes);
      if (!matchingSupertype) return;

      if (!acc[matchingSupertype]) {
        acc[matchingSupertype] = [];
      }
      if (!acc[matchingSupertype][subType]) {
        acc[matchingSupertype][subType] = card.amount;
      } else {
        acc[matchingSupertype][subType] += card.amount;
      }
    });

    return acc;
  }, {}) as Record<CardType, Record<string, number>>;

  const sortedRecords = Object.entries(subtypesBySupertype).sort((a, b) => {
    const aIndex = CARD_TYPE_DECK_ORDER.indexOf(a[0] as CardType);
    const bIndex = CARD_TYPE_DECK_ORDER.indexOf(b[0] as CardType);

    return aIndex - bIndex;
  }) as [CardType, Record<string, number>][];

  const sortSubTypeEntries = ([aName, aCount], [bName, bCount]) => {
    if (aCount !== bCount) {
      return aCount > bCount ? -1 : 1;
    }

    return aName.localeCompare(bName);
  };

  const getAmount = (type: CardType) => {
    return cardsbyTypeWithAmount.find(({ name }) => name === type)?.amount ?? 0;
  };

  return (
    <StyledList>
      {sortedRecords.map(([supertype, subtypes]) => (
        <li key={supertype}>
          <StyledTitle>
            <span>{supertype}</span>
            <StyledAmount>{getAmount(supertype)}</StyledAmount>
          </StyledTitle>
          {Object.entries(subtypes)
            .sort(sortSubTypeEntries)
            .map(([subType, count]) => (
              <StyledEntry key={subType}>
                <span>{subType}</span>
                <span>{count}</span>
              </StyledEntry>
            ))}
        </li>
      ))}
    </StyledList>
  );
};

export default DeckCardSubTypes;
