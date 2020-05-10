import React, { useState } from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router';
import { useQuery, useMutation } from 'react-apollo';

import {
  wantsListsDesktop as getWantsLists,
  createWantsListDesktop,
} from './queries';
import { splitWantsLists } from '../../Mobile/WantsLists/WantsLists';
import { OverviewList, OverviewListHeader } from '../../Elements/Desktop';
import { lightBackground } from '../../../constants/colors';

const StyledWrapper = styled.div`
  width: 100%;
  display: flex;
  height: 100%;
  flex-direction: column;
  align-items: center;
  background-color: ${lightBackground};
`;

const Wants = ({ history }) => {
  const { data, loading } = useQuery(getWantsLists);
  const [search, setSearch] = useState('');
  const [mutate] = useMutation(createWantsListDesktop);

  const onOpenWantsList = id => {
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

  const onOpenFirstDeck = () => {
    const firstList = [...unlinkedLists, ...linkedLists][0];
    if (!firstList) return;
    onOpenWantsList(firstList.id);
  };

  return (
    <StyledWrapper>
      <OverviewListHeader
        onAddWantsList={onAddWantsList}
        search={search}
        setSearch={setSearch}
        loading={loading}
        buttonText="New Wants List"
        onEnter={onOpenFirstDeck}
      />
      <OverviewList
        loading={loading}
        lists={unlinkedLists}
        onClick={onOpenWantsList}
      />
      {Boolean(linkedLists.length) && (
        <OverviewList
          loading={loading}
          lists={linkedLists}
          onClick={onOpenWantsList}
        />
      )}
    </StyledWrapper>
  );
};

export default withRouter(Wants);
