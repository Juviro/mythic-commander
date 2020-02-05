import React from 'react';
import { Spin } from 'antd';
import styled from 'styled-components';
import { useQuery } from 'react-apollo';
import { useQueryParams, StringParam } from 'use-query-params';

import { getCollection } from '../../../queries';
import CollectionList from './CollectionList';
import { filterCards, sortCards } from '../../Elements/SearchField/filterNames';

const StyledWrapper = styled.div`
  width: 100%;
  display: flex;
  min-height: 100px;
  align-items: center;
  flex-direction: column;
  justify-content: center;
`;

export default () => {
  const { data, loading } = useQuery(getCollection);
  const [{ query: searchQuery = '' }] = useQueryParams({
    query: StringParam,
  });

  const cards = (data && data.collection.cards) || [];
  const filteredCards = searchQuery
    ? filterCards(cards, searchQuery).sort(sortCards(searchQuery))
    : cards;

  return (
    <StyledWrapper>
      {loading ? <Spin /> : <CollectionList cards={filteredCards} />}
    </StyledWrapper>
  );
};
