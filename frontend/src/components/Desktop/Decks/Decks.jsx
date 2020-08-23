import React, { useState } from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router';
import { useQuery, useMutation } from 'react-apollo';

import { OverviewList, OverviewListHeader } from '../../Elements/Desktop';
import { lightBackground } from '../../../constants/colors';
import { getDecksDesktop, createDeckDesktop } from './queries';

const StyledWrapper = styled.div`
  width: 100%;
  display: flex;
  height: fit-content;
  flex-direction: column;
  align-items: center;
  min-height: 100%;
  background-color: ${lightBackground};
`;

const Wants = ({ history }) => {
  const { data, loading } = useQuery(getDecksDesktop, {
    fetchPolicy: 'network-only',
  });
  const [search, setSearch] = useState('');
  const [mutate] = useMutation(createDeckDesktop);

  const onOpenDeck = (id) => {
    history.push(`/decks/${id}`);
  };

  const onAddDeck = async () => {
    const {
      data: {
        createDeck: { id },
      },
    } = await mutate({
      update: (cache, { data: updateData }) => {
        const { createDeck: newList } = updateData;
        const existing = cache.readQuery({
          query: getDecksDesktop,
        });

        cache.writeQuery({
          query: getDecksDesktop,
          data: {
            decks: [...existing.decks, newList],
          },
        });
      },
    });
    onOpenDeck(id);
  };
  const decks = data ? data.decks : [];
  const filteredDecks = decks.filter(({ name }) =>
    name.toLowerCase().includes(search.toLowerCase())
  );

  const onOpenFirstDeck = () => {
    const firstDeck = filteredDecks[0];
    if (!firstDeck) return;
    onOpenDeck(firstDeck.id);
  };

  return (
    <StyledWrapper>
      <OverviewListHeader
        onAddList={onAddDeck}
        search={search}
        setSearch={setSearch}
        loading={loading}
        buttonText="New Deck"
        onEnter={onOpenFirstDeck}
      />
      <OverviewList loading={loading} lists={filteredDecks} onClick={onOpenDeck} />
    </StyledWrapper>
  );
};

export default withRouter(Wants);
