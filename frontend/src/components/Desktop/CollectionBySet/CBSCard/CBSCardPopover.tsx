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
  padding-right: 16px;
  font-weight: bold;
`;

const StyledValue = styled.td`
  text-align: right;
`;

const StyledLink = styled(Link)`
  margin-top: 16px;
`;

interface Props {
  set: Set;
}

const CBSCardPopover = ({ set }: Props) => {
  return (
    <StyledWrapper>
      <table>
        <tbody>
          <tr>
            <StyledLabel>Release Date</StyledLabel>
            <StyledValue>{formatDate(set.released_at)}</StyledValue>
          </tr>
          <tr>
            <StyledLabel>
              Unique Cards Collected
              <Hint text="Number of collected cards with different names from this set" />
            </StyledLabel>
            <StyledValue>{set.uniqueCardsOwned}</StyledValue>
          </tr>
          <tr>
            <StyledLabel>
              Total Cards Collected
              <Hint text="Total number of collected cards from this set" />
            </StyledLabel>
            <StyledValue>{set.totalCardsOwned}</StyledValue>
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