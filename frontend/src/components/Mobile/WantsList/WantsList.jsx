import React, { useEffect } from 'react';
import { Divider } from 'antd';
import styled from 'styled-components';
import { useQuery } from '@apollo/client';
import { useParams } from 'react-router';
import useDocumentTitle from 'components/Hooks/useDocumentTitle';
import LayoutAndSortPicker from 'components/Elements/Shared/LayoutAndSortPicker';
import NotFound from 'components/Elements/Shared/NotFound';
import { wantsList as wantsListQuery } from './queries';

import Header from './Header';
import AddWants from './AddWants';

import unifyCardFormat from '../../../utils/unifyCardFormat';
import { WantsListMobile } from '../../Elements/Mobile';

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 16px 8px;
`;

export default () => {
  const { id } = useParams();
  const { data, loading } = useQuery(wantsListQuery, {
    variables: { id },
  });

  const wantsList = data?.wantsList;
  const cards = wantsList && unifyCardFormat(wantsList.cards);
  const unifiedWantsList = wantsList && {
    ...wantsList,
    cards,
  };
  const canEdit = wantsList?.canEdit;

  useDocumentTitle(wantsList?.name);

  useEffect(() => {
    if (!loading) return;
    setTimeout(() => window.scrollTo(0, 0), 100);
    // eslint-disable-next-line
  }, [loading]);

  if (!data && !loading) {
    return <NotFound message="This wants list does not seem to exist.." />;
  }

  return (
    <StyledWrapper>
      <Header wantsList={unifiedWantsList} canEdit={canEdit} />
      <LayoutAndSortPicker showCollectionFilters />
      <Divider />
      <WantsListMobile
        paginated={false}
        cards={cards}
        loading={loading}
        canEdit={canEdit}
        rawWantsList={data && data.wantsList}
      />
      {canEdit && <AddWants containedCards={cards} />}
    </StyledWrapper>
  );
};
