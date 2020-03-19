import React from 'react';
import { Divider } from 'antd';
import styled from 'styled-components';
import { useQuery } from 'react-apollo';
import { useParams } from 'react-router';
import { wantsList as wantsListQuery } from './queries';

import Title from './Title';
import Stats from './Stats';
import AddWants from './AddWants';
import CardModal from '../Card/CardModal';
import { ListOrder } from '../../Elements';
import FilteredCardList from '../../Elements/CardList/FilteredCardList';

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 16px 8px;
`;

export default () => {
  const { id } = useParams();
  const { data } = useQuery(wantsListQuery, { variables: { id } });
  const cards = data && data.wantsList.cards;
  const basePath = `/m/wants/${id}`;
  const wantsList = data && data.wantsList;

  return (
    <StyledWrapper>
      <Title wantsList={wantsList} />
      <Stats wantsList={wantsList} />
      <ListOrder showCollectionFilters />
      <Divider />
      <FilteredCardList cards={cards} basePath={basePath} />
      <AddWants />
      <CardModal basePath={basePath} />
    </StyledWrapper>
  );
};
