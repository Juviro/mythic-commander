import React from 'react';
import styled from 'styled-components';
import { useQuery } from 'react-apollo';
import { Divider } from 'antd';
import { getMinimalCollection } from './queries';

import { CardList } from '../../Elements';
import CollectionOverview from './CollectionOverview';
import CollapsableFilter from '../../Elements/Filter/CollapsableFilter';

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
  const { data } = useQuery(getMinimalCollection);
  const cards = data && data.collection.cards;
  return (
    <StyledWrapper>
      <CollapsableFilter />
      <CollectionOverview cards={cards} />
      <Divider />
      <CardList cards={cards} />
    </StyledWrapper>
  );
};
