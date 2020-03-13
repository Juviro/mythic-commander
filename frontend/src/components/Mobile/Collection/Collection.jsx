import React from 'react';
import styled from 'styled-components';
import { useQuery } from 'react-apollo';
import { getMinimalCollection } from './queries';
import CardList from '../../Elements/CardList';
import CollectionFilter from './CollectionFilter';

const StyledWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export default () => {
  const { data } = useQuery(getMinimalCollection);
  const cards = data && data.collection.cards;
  return (
    <StyledWrapper>
      <CollectionFilter />
      <CardList cards={cards} />
    </StyledWrapper>
  );
};
