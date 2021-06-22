import React, { useContext, useState } from 'react';
import { withRouter } from 'react-router';
import { useQuery, useMutation } from 'react-apollo';

import UserContext from 'components/Provider/UserProvider';
import { LoginRequired } from 'components/Elements/Shared/LoginRequired/LoginRequired';
import useDocumentTitle from 'components/Hooks/useDocumentTitle';
import { OverviewList, OverviewListHeader, PageLayout } from '../../Elements/Desktop';
import { getDecksDesktop, createDeckDesktop } from './queries';

const Wants = ({ history }) => {
  const { data, loading } = useQuery(getDecksDesktop, {
    fetchPolicy: 'network-only',
  });
  const [search, setSearch] = useState('');
  const [mutate] = useMutation(createDeckDesktop);
  const { user, loading: userLoading } = useContext(UserContext);
  useDocumentTitle('Your Decks');

  if (!user && !userLoading) {
    return <LoginRequired message="Log in to create your own decks" />;
  }

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
    <PageLayout>
      <OverviewListHeader
        onAddList={onAddDeck}
        search={search}
        setSearch={setSearch}
        loading={loading}
        buttonText="New Deck"
        title="Your Decks"
        onEnter={onOpenFirstDeck}
      />
      <OverviewList
        loading={loading}
        lists={filteredDecks}
        onClick={onOpenDeck}
        emptyText="No Decks found"
      />
    </PageLayout>
  );
};

export default withRouter(Wants);
