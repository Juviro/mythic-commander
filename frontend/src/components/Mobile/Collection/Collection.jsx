import React from 'react';
import styled from 'styled-components';
import { Divider, Collapse } from 'antd';

import { LayoutAndSortPicker, CollectionStats } from '../../Elements/Shared';
import AddToCollection from './AddToCollection';
import Cards from './Cards';

const StyledWrapper = styled.div`
  width: 100%;
  padding: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export default () => {
  return (
    <StyledWrapper>
      <Collapse
        style={{ width: '100%', backgroundColor: 'white' }}
        expandIcon={() => <div />}
        expandIconPosition="right"
        defaultActiveKey="1"
      >
        <Collapse.Panel key="1" size="small" header="Your Collection">
          <CollectionStats small />
        </Collapse.Panel>
      </Collapse>
      <LayoutAndSortPicker showCollectionFilters />
      <Divider />
      <Cards />
      <AddToCollection />
    </StyledWrapper>
  );
};
