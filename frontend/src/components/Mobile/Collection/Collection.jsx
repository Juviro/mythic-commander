import React from 'react';
import styled from 'styled-components';
import { useQuery } from 'react-apollo';
import { Divider, Card } from 'antd';
import { getMobileCollection } from './queries';

import { FilteredCardList } from '../../Elements/Mobile';
import {
  LayoutAndSortPicker,
  CollectionOverview,
  CollapsableFilter,
} from '../../Elements/Shared';
import unifyCardFormat from '../../../utils/unifyCardFormat';
import CardModal from '../Card/CardModal';
import AddToCollection from './AddToCollection';

const StyledWrapper = styled.div`
  width: 100%;
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
      <Card
        style={{ width: '100%' }}
        loading={!cards}
        title="Your Collection"
        size="small"
      >
        <CollectionOverview cards={cards} column={2} />
      </Card>
      <CollapsableFilter />
      <LayoutAndSortPicker showCollectionFilters />
      <Divider />
      <FilteredCardList cards={cards} basePath="/m/collection" />
      <AddToCollection />
      <CardModal />
    </StyledWrapper>
  );
};
