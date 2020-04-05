import React, { useState } from 'react';
import styled from 'styled-components';
import { useQuery } from '@apollo/react-hooks';

import { getCollectionDesktop as getCollection } from './queries';
import unifyCardFormat from '../../../utils/unifyCardFormat';
import Cards from './Cards';
import Sidebar from './Sidebar';

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: row;
  height: calc(100% - 49px);
`;

export default () => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  const { data, loading } = useQuery(getCollection);
  const cards = data && unifyCardFormat(data.collection.cards);
  return (
    <StyledWrapper>
      <Sidebar
        cards={cards}
        isVisible={isSidebarVisible}
        setIsVisible={setIsSidebarVisible}
      />
      <Cards
        cards={cards}
        loading={loading}
        isSidebarVisible={isSidebarVisible}
      />
    </StyledWrapper>
  );
};
