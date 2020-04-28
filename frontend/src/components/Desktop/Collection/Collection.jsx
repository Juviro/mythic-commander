import React from 'react';
import styled from 'styled-components';
import { useQuery } from '@apollo/react-hooks';

import { getCollectionDesktop as getCollection } from './queries';
import unifyCardFormat from '../../../utils/unifyCardFormat';
import Cards from './Cards';
import Sidebar from './Sidebar';
import { useToggle } from '../../Hooks';

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: row;
  height: calc(100% - 49px);
`;

export default () => {
  const sidebarInitiallyVisible = window.innerWidth >= 1200;
  const [isSidebarVisible, toggleIsSidebarVisible] = useToggle(
    sidebarInitiallyVisible
  );
  const { data, loading } = useQuery(getCollection);
  console.log('data :', data);
  const snapshot = data && data.collection.snapshot;
  const cards = data && unifyCardFormat(data.collection.cards);
  console.log('cards :', cards);

  return (
    <StyledWrapper>
      <Sidebar
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
