import React, { useState } from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router';
import { useQuery, useMutation } from 'react-apollo';

import {
  wantsListsDesktop as getWantsLists,
  createWantsListDesktop,
} from './queries';
import { splitWantsLists } from '../../Mobile/WantsLists/WantsLists';
import { OverviewList } from '../../Elements/Desktop';
import Header from './Header';
import { lightBackground } from '../../../constants/colors';

const StyledWrapper = styled.div`
  width: 100%;
  display: flex;
  min-height: 100px;
  flex-direction: column;
  align-items: center;
  min-height: calc(100% - 46px);
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
      <Header
        onAddWantsList={onAddWantsList}
        search={search}
        setSearch={setSearch}
        loading={loading}
        onEnter={onOpenFirstDeck}
      />
      <OverviewList
        loading={loading}
        lists={unlinkedLists}
        onClick={onOpenWantsList}
      />
      <OverviewList
        loading={loading}
        lists={linkedLists}
        onClick={onOpenWantsList}
      />
    </StyledWrapper>
  );
};

export default withRouter(Wants);
