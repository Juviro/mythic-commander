import React from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router';
import { useQuery } from '@apollo/react-hooks';

import unifyCardFormat from '../../../utils/unifyCardFormat';
import Cards from './Cards';
import WantsListSidebar from './WantsListSidebar';
import { useToggle } from '../../Hooks';
import { wantsListDesktop } from './queries';

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: row;
  height: calc(100% - 49px);
`;

export default () => {
  const { id } = useParams();
  const sidebarInitiallyVisible = window.innerWidth >= 1200;
  const [isSidebarVisible, toggleIsSidebarVisible] = useToggle(
    sidebarInitiallyVisible
  );
  const { data, loading } = useQuery(wantsListDesktop, { variables: { id } });
  const snapshot = data && data.collection.snapshot;
  const cards = data && unifyCardFormat(data.collection.cards);

  return (
    <StyledWrapper>
      <WantsListSidebar
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
