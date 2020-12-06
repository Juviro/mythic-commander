import React from 'react';
import { useParams } from 'react-router';
import { useQuery } from '@apollo/react-hooks';

import { PageLayout } from 'components/Elements/Desktop';
import { UnifiedWantsList } from 'types/unifiedTypes';
import unifyCardFormat from '../../../utils/unifyCardFormat';
import Cards from './Cards';
import { wantsListDesktop } from './queries';
import Overview from './Overview';

export default () => {
  const { id } = useParams<{ id: string }>();
  const { data, loading } = useQuery(wantsListDesktop, {
    variables: { id },
    fetchPolicy: 'network-only',
  });
  const cards = data && unifyCardFormat(data.wantsList.cards);
  const wantsList: UnifiedWantsList = data && { ...data.wantsList, cards };

  return (
    <PageLayout>
      <Overview wantsList={wantsList} loading={loading} />
      <Cards cards={cards} loading={loading} wantsList={wantsList} />
    </PageLayout>
  );
};
