import React from 'react';
import styled from 'styled-components';
import { useQuery } from 'react-apollo';
import { Divider } from 'antd';
import { getMobileCollection } from './queries';

import { ListOrder } from '../../Elements';
import unifyCardFormat from '../../../utils/unifyCardFormat';
import CollectionOverview from './CollectionOverview';
import CollapsableFilter from '../../Elements/Filter/CollapsableFilter';
import FilteredCardList from '../../Elements/CardList/FilteredCardList';
import CardModal from '../Card/CardModal';
import AddToCollection from './AddToCollection';

const StyledWrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export default () => {
  const { data } = useQuery(getMobileCollection);
  const cards = unifyCardFormat(data && data.collection.cards);

  return (
    <StyledWrapper>
      <CollectionOverview cards={cards} />
      <CollapsableFilter />
      <ListOrder showCollectionFilters />
      <Divider />
      <FilteredCardList cards={cards} basePath="/m/collection" />
      <AddToCollection />
      <CardModal />
    </StyledWrapper>
  );
};
