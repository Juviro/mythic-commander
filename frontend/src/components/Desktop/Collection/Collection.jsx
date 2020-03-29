import React from 'react';
import styled from 'styled-components';
import { useQuery } from '@apollo/react-hooks';

import { getCollectionDesktop as getCollection } from './queries';
import unifyCardFormat from '../../../utils/unifyCardFormat';
import Cards from './Cards';
import Overview from './Overview';

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: row;
  padding: 24px;
`;

export default () => {
  const { data, loading } = useQuery(getCollection);
  const cards = data && unifyCardFormat(data.collection.cards);
  return (
    <StyledWrapper>
      <Overview cards={cards} />
      <Cards cards={cards} loading={loading} />
    </StyledWrapper>
  );
};
