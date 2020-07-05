import React from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router';

import Cards from './Cards';
import CollectionSidebar from './CollectionSidebar';
import useLocalStorage from '../../Hooks/useLocalStorage';

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: row;
  height: 100%;
`;

export default () => {
  const { username } = useParams();
  console.log('username :', username);
  const [isSidebarVisible, setIsSidebarVisible] = useLocalStorage(
    'isSidebarVisible',
    true
  );
  const toggleIsSidebarVisible = () => setIsSidebarVisible(!isSidebarVisible);

  return (
    <StyledWrapper>
      {!username && (
        <CollectionSidebar
          isVisible={isSidebarVisible}
          toggleIsVisible={toggleIsSidebarVisible}
        />
      )}
      <Cards
        isSidebarVisible={isSidebarVisible && !username}
        username={username}
      />
    </StyledWrapper>
  );
};
