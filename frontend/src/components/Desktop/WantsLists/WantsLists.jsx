import React, { useContext, useState } from 'react';
import { withRouter } from 'react-router';
import { useQuery, useMutation } from '@apollo/client';

import UserContext from 'components/Provider/UserProvider';
import { LoginRequired } from 'components/Elements/Shared/LoginRequired/LoginRequired';
import useDocumentTitle from 'components/Hooks/useDocumentTitle';
import PageLayout from 'components/Elements/Desktop/PageLayout';
import OverviewList, {
  OverviewListHeader,
} from 'components/Elements/Desktop/OverviewList';
import { Divider } from 'antd';
import getDynamicUrl from 'utils/getDynamicUrl';
import { wantsListsDesktop as getWantsLists, createWantsListDesktop } from './queries';

const Wants = ({ history }) => {
  const { data, loading } = useQuery(getWantsLists, {
    fetchPolicy: 'network-only',
  });
  const [search, setSearch] = useState('');
  const [mutate] = useMutation(createWantsListDesktop);

  const { user, loading: userLoading } = useContext(UserContext);
  useDocumentTitle('Your Wants Lists');

  if (!user && !userLoading) {
    return <LoginRequired message="Log in to create your own wants lists" />;
  }

  const onOpenWantsList = (id) => {
    history.push(`/wants/${id}`);
  };

  const onAddWantsList = async () => {
    const {
      data: {
        createWantsList: { id },
      },
    } = await mutate({
      update: (cache, { data: updateData }) => {
        const { createWantsList: newList } = updateData;
        const existing = cache.readQuery({
          query: getWantsLists,
        });

        cache.writeQuery({
          query: getWantsLists,
          data: {
            wantsLists: [...existing.wantsLists, newList],
          },
        });
      },
    });
    onOpenWantsList(id);
  };

  const wantsLists = data?.wantsLists ?? [];
  const displayedWantsLists = wantsLists
    .filter((list) => list.name.toLowerCase().includes(search.toLowerCase()))
    .map(({ deck, ...rest }) => ({
      ...rest,
      deckId: deck?.id,
      imgSrc: deck?.imgSrc,
    }));

  const [linkedLists, unlinkedLists] = displayedWantsLists.reduce(
    (acc, list) => {
      if (list.deckId) {
        acc[0].push(list);
      } else {
        acc[1].push(list);
      }
      return acc;
    },
    [[], []]
  );

  const onOpenFirstDeck = () => {
    const firstList = displayedWantsLists[0];
    if (!firstList) return;
    onOpenWantsList(firstList.id);
  };

  return (
    <PageLayout>
      <OverviewListHeader
        onAddList={onAddWantsList}
        search={search}
        setSearch={setSearch}
        loading={loading}
        buttonText="New Wants List"
        onEnter={onOpenFirstDeck}
        title="Your Wants Lists"
      />
      <Divider orientation="left">Unlinked</Divider>
      <OverviewList
        loading={loading}
        lists={unlinkedLists}
        getHref={(id) => getDynamicUrl(`/wants/${id}`)}
        emptyText="No Wants Lists found"
      />
      <Divider orientation="left">Linked to Decks</Divider>
      <OverviewList
        loading={loading}
        lists={linkedLists}
        getHref={(id) => getDynamicUrl(`/wants/${id}`)}
        emptyText="No Linked Wants Lists found"
      />
    </PageLayout>
  );
};

export default withRouter(Wants);
