import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { Set } from '../../../../types/graphql';
import formatDate from '../../../../utils/formatDate';
import Hint from '../../../Elements/Shared/Hint/Hint';

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledLabel = styled.td`
  padding-right: 48px;
  padding-bottom: 4px;
  font-weight: bold;
`;

const StyledValue = styled.td`
  text-align: right;
`;

const StyledLink = styled(Link)`
  margin-top: 16px;
`;

const getPercentageLabel = (value: number, total: number) => {
  const percentage = Math.floor((100 * value) / total) / 100;
  return `${value} of ${total} (${Math.round(percentage * 100)}%)`;
};

interface Props {
  set: Set;
}

const CBSCardPopover = ({ set }: Props) => {
  // const displayUniqueVersionsStat = set.card_count !== set.uniqueCardCount;

  return (
    <StyledWrapper>
      <table>
        <tbody>
          <tr>
            <StyledLabel>Release Date</StyledLabel>
            <StyledValue>{formatDate(set.released_at)}</StyledValue>
          </tr>
          <tr>
            <StyledLabel>Unique Cards Collected:</StyledLabel>
            <StyledValue>
              {getPercentageLabel(set.uniqueCardsOwned, set.uniqueCardCount)}
              {/* eslint-disable-next-line max-len */}
              <Hint text="Number of unique cards collected from this set (e.g. different card names)" />
            </StyledValue>
          </tr>
          {/* {displayUniqueVersionsStat && (
            <tr>
              <StyledLabel>Unique Versions Collected:</StyledLabel>
              <StyledValue>
                {getPercentageLabel(set.uniqueVersionsOwned, set.card_count)}
                <Hint 
                  text="Number of unique card versions collected 
                  from this set (e.g. different collector numbers)" 
                />
              </StyledValue>
            </tr>
          )} */}
          <tr>
            <StyledLabel>Total Cards Collected:</StyledLabel>
            <StyledValue>
              {set.totalCardsOwned}
              <Hint text="Total number of physical cards collected from this set" />
            </StyledValue>
          </tr>
        </tbody>
      </table>
      <StyledLink to={`/search?sets=${set.code}`}>
        Show all cards from this set
      </StyledLink>
    </StyledWrapper>
  );
};

export default CBSCardPopover;
