import React, { useContext, useState } from 'react';
import { withRouter } from 'react-router';
import { useQuery, useMutation } from 'react-apollo';

import UserContext from 'components/Provider/UserProvider';
import { LoginRequired } from 'components/Elements/Shared';
import { wantsListsDesktop as getWantsLists, createWantsListDesktop } from './queries';
import { splitWantsLists } from '../../Mobile/WantsLists/WantsLists';
import { OverviewList, OverviewListHeader, PageLayout } from '../../Elements/Desktop';

const Wants = ({ history }) => {
  const { data, loading } = useQuery(getWantsLists, {
    fetchPolicy: 'network-only',
  });
  const [search, setSearch] = useState('');
  const [mutate] = useMutation(createWantsListDesktop);

  const { user, loading: userLoading } = useContext(UserContext);

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
  const [unlinkedLists, linkedLists] = splitWantsLists(data, search);

  const wantsLists = unlinkedLists.concat(linkedLists);

  const onOpenFirstDeck = () => {
    const firstList = [...unlinkedLists, ...linkedLists][0];
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
      <OverviewList
        loading={loading}
        lists={wantsLists}
        onClick={onOpenWantsList}
        emptyText="No Wants Lists found"
      />
    </PageLayout>
  );
};

export default withRouter(Wants);
