import React, { useContext } from 'react';
import { Spin } from 'antd';
import styled from 'styled-components';
import { partition } from 'lodash';
import { useQuery, useMutation } from '@apollo/client';

import { withRouter } from 'react-router';
import UserContext from 'components/Provider/UserProvider';
import { LoginRequired } from 'components/Elements/Shared/LoginRequired/LoginRequired';
import useDocumentTitle from 'components/Hooks/useDocumentTitle';
import { wantsListsMobile as getWantsLists, createWantsList } from './queries';
import { OverviewList } from '../../Elements/Mobile';

const StyledWrapper = styled.div`
  width: 100%;
  display: flex;
  min-height: 100px;
  align-items: center;
  flex-direction: column;
  justify-content: center;
`;

export const splitWantsLists = (data, search = '') => {
  if (!data) return [[], []];
  const { wantsLists } = data;
  const filteredWantsLists = wantsLists.filter(({ name }) =>
    name.toLowerCase().includes(search.toLowerCase())
  );
  const [unlinkedLists, linkedLists] = partition(
    filteredWantsLists,
    (wantsList) => !wantsList.deck
  );

  return [
    unlinkedLists,
    linkedLists
      .map(({ deck, ...rest }) => ({
        ...rest,
        deckId: deck.id,
        imgSrc: deck.imgSrc,
        additionalDescription: ` - ${deck.name}`,
      }))
      .sort((a, b) => a.deckId - b.deckId),
  ];
};

const Wants = ({ history }) => {
  const { data, loading } = useQuery(getWantsLists);
  const [unlinkedLists, linkedLists] = splitWantsLists(data);
  const [mutate] = useMutation(createWantsList);

  useDocumentTitle('Your Wants Lists');

  const { user, loading: userLoading } = useContext(UserContext);

  if (!user && !userLoading) {
    return <LoginRequired message="Log in to create your own wants lists" />;
  }

  const onOpenWantsList = (id) => {
    history.push(`/m/wants/${id}`);
  };
  const onAddDeck = async () => {
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

  return (
    <StyledWrapper>
      {loading ? (
        <Spin />
      ) : (
        <>
          <OverviewList
            header="Your Wants Lists"
            elements={unlinkedLists}
            addElementText="Add Wants List"
            onAddElement={onAddDeck}
            onClick={onOpenWantsList}
          />
          {Boolean(linkedLists.length) && (
            <OverviewList
              header="Linked Wants Lists"
              elements={linkedLists}
              onClick={onOpenWantsList}
            />
          )}
        </>
      )}
    </StyledWrapper>
  );
};

export default withRouter(Wants);
