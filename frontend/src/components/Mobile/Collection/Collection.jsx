import UserContext from 'components/Provider/UserProvider';
import React, { useContext } from 'react';
import styled from 'styled-components';

import { LayoutAndSortPicker, LoginRequired } from '../../Elements/Shared';
import AddToCollection from './AddToCollection';
import Cards from './Cards';
import CollectionOverview from './CollectionOverview';

const StyledBody = styled.div`
  padding: 8px;
`;

export default () => {
  const { user, loading } = useContext(UserContext);

  if (!user && !loading) {
    return <LoginRequired message="Login to create your own collection" />;
  }

  return (
    <>
      <CollectionOverview />
      <StyledBody>
        <LayoutAndSortPicker showCollectionFilters />
        <Cards />
        <AddToCollection />
      </StyledBody>
    </>
  );
};
