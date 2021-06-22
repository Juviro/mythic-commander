import React from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router';
import { useQuery } from 'react-apollo';
import { Typography } from 'antd';

import CustomSkeleton from 'components/Elements/Shared/CustomSkeleton';
import LayoutAndSortPicker from 'components/Elements/Shared/LayoutAndSortPicker';
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

export default ({ deck }) => {
  const { id: deckId } = useParams();
  const { data, loading } = useQuery(wantsListsForDeckMobile, {
    variables: { deckId },
  });

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
          <WantsListsCollapse wantsLists={data.wantsLists} deck={deck} />
        </StyledWantsWrapper>
      )}
    </StyledWrapper>
  );
};
