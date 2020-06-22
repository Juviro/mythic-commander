import React from 'react';
import styled from 'styled-components';
import { useQuery } from '@apollo/react-hooks';

import { getCollectionDesktop as getCollection } from './queries';
import unifyCardFormat from '../../../../utils/unifyCardFormat';
import Cards from './Cards';
import CollectionSidebar from './CollectionSidebar';
import useLocalStorage from '../../../Hooks/useLocalStorage';

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: row;
  height: 100%;
`;

export default () => {
  const [isSidebarVisible, setIsSidebarVisible] = useLocalStorage(
    'isSidebarVisible',
    true
  );
  const toggleIsSidebarVisible = () => setIsSidebarVisible(!isSidebarVisible);
  const { data, loading } = useQuery(getCollection);
  const snapshot = data && data.collection.snapshot;
  const cards = data && unifyCardFormat(data.collection.cards);

  return (
    <StyledWrapper>
      <CollectionSidebar
        cards={cards}
        loading={loading}
        snapshot={snapshot}
        isVisible={isSidebarVisible}
        toggleIsVisible={toggleIsSidebarVisible}
      />
      <Cards
        cards={cards}
        loading={loading}
        isSidebarVisible={isSidebarVisible}
      />
    </StyledWrapper>
  );
};
