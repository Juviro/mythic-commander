import React from 'react';
import styled from 'styled-components';

import { Set } from '../../../types/graphql';
import CBSCard from './CBSCard/CBSCard';

const StyledWrapper = styled.div`
  padding: 48px 0;
`;

const StyledSets = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  column-gap: 16px;
  row-gap: 64px;
`;

interface Props {
  sets: Set[];
}

const CBSGroup = ({ sets }: Props) => {
  return (
    <StyledWrapper>
      <StyledSets>
        {sets.map((set) => (
          <CBSCard set={set} key={set.code} />
        ))}
      </StyledSets>
    </StyledWrapper>
  );
};

export default CBSGroup;
