import React from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router';
import { useQuery } from 'react-apollo';
import { Typography } from 'antd';

import { CustomSkeleton, LayoutAndSortPicker } from '../../../Elements/Shared';
import { wantsListsForDeckMobile } from './queries';
import WantsListsCollapse from './WantsListsCollapse';
import AddWantsList from './AddWantsList';

const StyledWrapper = styled.div`
  width: 100%;
  padding: 0 16px 56px;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const StyledWantsWrapper = styled.div`
  width: 100%;
  margin-top: 32px;
`;

const StyledTitleWrapper = styled.div`
  display: flex;
  margin-bottom: 16px;
  align-items: center;
  justify-content: space-between;
`;

export default () => {
  const { id: deckId } = useParams();
  const { data, loading } = useQuery(wantsListsForDeckMobile, {
    variables: { deckId },
  });
  const basePath = `/m/decks/${deckId}`;

  const numberOfWantsLists = data && data.wantsLists.length;
  const numberOfCards =
    data && data.wantsLists.reduce((acc, { cards }) => acc + cards.length, 0);
  const title = numberOfWantsLists
    ? `${numberOfCards} cards in ${numberOfWantsLists} lists`
    : '';

  return (
    <StyledWrapper>
      {loading ? (
        <CustomSkeleton.List />
      ) : (
        <StyledWantsWrapper>
          <StyledTitleWrapper>
            <Typography.Text style={{ fontSize: 18 }}>{title}</Typography.Text>
            <AddWantsList deckId={deckId} />
          </StyledTitleWrapper>
          {Boolean(numberOfWantsLists) && <LayoutAndSortPicker />}
          <WantsListsCollapse
            basePath={basePath}
            wantsLists={data.wantsLists}
          />
        </StyledWantsWrapper>
      )}
    </StyledWrapper>
  );
};
