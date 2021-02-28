import React, { useContext } from 'react';
import { Spin } from 'antd';
import styled from 'styled-components';
import { useQuery } from 'react-apollo';

import UserContext from 'components/Provider/UserProvider';
import { LoginRequired } from 'components/Elements/Shared';
import { getDecks } from '../../../queries';
import DeckList from './DeckList';

const StyledWrapper = styled.div`
  width: 100%;
  display: flex;
  min-height: 100px;
  align-items: center;
  flex-direction: column;
  justify-content: center;
`;

export default () => {
  const { data, loading } = useQuery(getDecks);
  const decks = data ? data.decks : [];
  const { user, loading: userLoading } = useContext(UserContext);

  if (!user && !userLoading) {
    return <LoginRequired message="Log in to create your own decks" />;
  }

  return (
    <StyledWrapper>
      {loading && !decks.length ? <Spin /> : <DeckList decks={decks} />}
    </StyledWrapper>
  );
};
