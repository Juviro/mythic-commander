import React from 'react';
import styled, { css } from 'styled-components';

import { UnifiedDeck } from 'types/unifiedTypes';
import { CardType } from 'components/Provider/CardProvider/staticTypes';
import { typeToPlural } from 'utils/getCardsByType';
import useGetSubtypes from './useGetSubtypes';

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
  const { sortedRecords } = useGetSubtypes(deck, cardsbyTypeWithAmount);

  const sortSubTypeEntries = ([aName, aCount], [bName, bCount]) => {
    if (aCount !== bCount) {
      return aCount > bCount ? -1 : 1;
    }

    return aName.localeCompare(bName);
  };

  return (
    <StyledList>
      {sortedRecords.map(([supertype, { amount, subTypes }]) => (
        <li key={supertype}>
          <StyledTitle>
            <span>{typeToPlural(supertype)}</span>
            <StyledAmount>{amount}</StyledAmount>
          </StyledTitle>
          {Object.entries(subTypes)
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
