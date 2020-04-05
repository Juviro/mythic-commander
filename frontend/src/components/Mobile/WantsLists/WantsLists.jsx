import React from 'react';
import { Spin } from 'antd';
import styled from 'styled-components';
import { partition } from 'lodash';
import { useQuery, useMutation } from 'react-apollo';

import { withRouter } from 'react-router';
import { wantsLists as getWantsLists, createWantsList } from './queries';
import OverviewList from '../../Elements/OverviewList/OverviewList';

const StyledWrapper = styled.div`
  width: 100%;
  display: flex;
  min-height: 100px;
  align-items: center;
  flex-direction: column;
  justify-content: center;
`;

const splitWantsLists = data => {
  if (!data) return [[], []];
  const { wantsLists } = data;
  const [unlinkedLists, linkedLists] = partition(
    wantsLists,
    wantsList => !wantsList.deck
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

  const onOpenWantsList = id => {
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
            header="Your wants lists"
            elements={unlinkedLists}
            addElementText="Add wants list"
            onAddElement={onAddDeck}
            onClick={onOpenWantsList}
          />
          {Boolean(linkedLists.length) && (
            <OverviewList
              header="Linked wants lists"
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
