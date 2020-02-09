import React from 'react';
import styled from 'styled-components';
import { useQuery } from 'react-apollo';

import { useParams } from 'react-router';
import { getCard } from '../../../queries';

import CardSets from './CardSets';
import CardRules from './CardRules';
import CollectionOverview from './CollectionOverview';
import LazyLoadCard from '../../Elements/LazyLoadCard/LazyLoadCard';

const StyledWrapper = styled.div`
  width: 100%;
  padding: 0 5vw;
  display: flex;
  min-height: 100px;
  align-items: center;
  flex-direction: column;
  justify-content: center;
`;

export default () => {
  const { id } = useParams();
  const { data, loading } = useQuery(getCard, { variables: { id } });
  console.log('loading :', loading);
  const card = data && data.card;

  return (
    <StyledWrapper>
      <LazyLoadCard card={card} />
      <CardSets card={card} loading={loading} />
      <CollectionOverview card={card} />
      <CardRules card={card} />
    </StyledWrapper>
  );
};
