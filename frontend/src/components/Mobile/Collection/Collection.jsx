import React from 'react';
import styled from 'styled-components';
import { useQuery } from 'react-apollo';
import { Divider, Collapse } from 'antd';
import { getMobileCollection } from './queries';

import { FilteredCardList } from '../../Elements/Mobile';
import {
  LayoutAndSortPicker,
  CollectionStats,
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
  const snapshot = data && data.collection.snapshot;

  return (
    <StyledWrapper>
      <Collapse
        style={{ width: '100%', backgroundColor: 'white' }}
        expandIcon={() => <div />}
        expandIconPosition="right"
        defaultActiveKey="1"
      >
        <Collapse.Panel key="1" size="small" header="Your Collection">
          <CollectionStats
            cards={cards}
            snapshot={snapshot}
            small
            loading={!cards}
          />
        </Collapse.Panel>
      </Collapse>
      <CollapsableFilter />
      <LayoutAndSortPicker showCollectionFilters />
      <Divider />
      <FilteredCardList cards={cards} />
      <AddToCollection />
      <CardModal />
    </StyledWrapper>
  );
};
