import React, { useContext, useState } from 'react';
import { withRouter } from 'react-router';
import { useQuery, useMutation } from '@apollo/client';

import UserContext from 'components/Provider/UserProvider';
import { LoginRequired } from 'components/Elements/Shared/LoginRequired/LoginRequired';
import useDocumentTitle from 'components/Hooks/useDocumentTitle';
import { Button, Divider } from 'antd';
import PageLayout from 'components/Elements/Desktop/PageLayout';
import OverviewList, {
  OverviewListHeader,
} from 'components/Elements/Desktop/OverviewList';
import getDynamicUrl from 'utils/getDynamicUrl';
import { getDecksDesktop, createDeckDesktop } from './queries';
import useGroupByDeckType from '../../../hooks/useGroupByDeckType';

const Decks = ({ history }) => {
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

  const deckListssByType = useGroupByDeckType(filteredDecks);

  const onOpenFirstDeck = () => {
    const firstDeck = filteredDecks[0];
    if (!firstDeck) return;
    onOpenDeck(firstDeck.id);
  };

  const onOpenTokenView = () => {
    history.push(`/proxy?type=tokens`);
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
        extra={
          <Button onClick={onOpenTokenView} ghost type="primary">
            Token Finder
          </Button>
        }
      />
      {deckListssByType.map(({ decks: decksByType, status }) => (
        <React.Fragment key={status}>
          <Divider orientation="left">{`${status} (${decksByType.length})`}</Divider>
          <OverviewList
            loading={loading}
            lists={decksByType}
            getHref={(id) => getDynamicUrl(`/decks/${id}`)}
            emptyText={`You don't have any ${status} decks yet`}
          />
        </React.Fragment>
      ))}
    </PageLayout>
  );
};

export default withRouter(Decks);
