import React from 'react';
import { useParams } from 'react-router';
import { useQuery } from '@apollo/react-hooks';

import { PageLayout } from 'components/Elements/Desktop';
import { UnifiedWantsList } from 'types/unifiedTypes';
import { NotFound } from 'components/Elements/Shared';
import useDocumentTitle from 'components/Hooks/useDocumentTitle';
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
  const canEdit = data?.wantsList?.canEdit;
  useDocumentTitle(wantsList?.name);

  if (!data && !loading) {
    return <NotFound message="This wants list does not seem to exist.." />;
  }

  return (
    <PageLayout>
      <Overview wantsList={wantsList} loading={loading} canEdit={canEdit} />
      <Cards cards={cards} loading={loading} wantsList={wantsList} canEdit={canEdit} />
    </PageLayout>
  );
};
