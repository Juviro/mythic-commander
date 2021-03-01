import UserContext from 'components/Provider/UserProvider';
import React, { useContext } from 'react';
import { useParams } from 'react-router';
import styled from 'styled-components';

import { LayoutAndSortPicker, LoginRequired } from '../../Elements/Shared';
import AddToCollection from './AddToCollection';
import Cards from './Cards';
import CollectionOverview from './CollectionOverview';

const StyledBody = styled.div`
  padding: 8px;
`;

export default () => {
  const { username } = useParams();
  const { user, loading } = useContext(UserContext);

  if (!username && !user && !loading) {
    return <LoginRequired message="Log in to create your own collection" />;
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
