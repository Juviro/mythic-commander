import React from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router';
import { useQuery } from '@apollo/react-hooks';

import unifyCardFormat from '../../../utils/unifyCardFormat';
import Cards from './Cards';
import WantsListSidebar from './WantsListSidebar';
import { wantsListDesktop } from './queries';
import useLocalStorage from '../../Hooks/useLocalStorage';

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: row;
  height: 100%;
`;

const SIDEBAR_WIDTH = 350;

export default () => {
  const { id } = useParams();
  const [isSidebarVisible, setIsSidebarVisible] = useLocalStorage(
    'isSidebarVisible',
    true
  );
  const toggleIsSidebarVisible = () => setIsSidebarVisible(!isSidebarVisible);
  const { data, loading } = useQuery(wantsListDesktop, {
    variables: { id },
    fetchPolicy: 'network-only',
  });
  const cards = data && unifyCardFormat(data.wantsList.cards);
  const wantsList = data && { ...data.wantsList, cards };

  const widthOffset = isSidebarVisible ? SIDEBAR_WIDTH : 0;

  return (
    <StyledWrapper>
      <WantsListSidebar
        loading={loading}
        wantsList={wantsList}
        isVisible={isSidebarVisible}
        width={SIDEBAR_WIDTH}
        toggleIsVisible={toggleIsSidebarVisible}
      />
      <Cards
        cards={cards}
        loading={loading}
        wantsList={wantsList}
        widthOffset={widthOffset}
      />
    </StyledWrapper>
  );
};
