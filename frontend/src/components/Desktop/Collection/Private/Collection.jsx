import React from 'react';
import styled from 'styled-components';

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

  return (
    <StyledWrapper>
      <CollectionSidebar
        isVisible={isSidebarVisible}
        toggleIsVisible={toggleIsSidebarVisible}
      />
      <Cards isSidebarVisible={isSidebarVisible} />
    </StyledWrapper>
  );
};
