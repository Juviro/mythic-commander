import React, { useEffect } from 'react';
import { useQuery } from 'react-apollo';
import { useParams } from 'react-router';

import PageLayout, { PageCard } from 'components/Elements/Desktop/PageLayout';
import useDocumentTitle from 'components/Hooks/useDocumentTitle';
import NotFound from 'components/Elements/Shared/NotFound';
import CardDetailsDesktop from '../../Elements/Desktop/CardDetailsDesktop';
import { cardDetailsDesktop } from '../../Elements/Desktop/CardDetailsDesktop/queries';
import { unifySingleCard } from '../../../utils/unifyCardFormat';

export default () => {
  const { oracle_id } = useParams();
  const { data, loading } = useQuery(cardDetailsDesktop, {
    variables: { oracle_id },
    fetchPolicy: 'network-only',
  });
  const card = data?.cardByOracleId && unifySingleCard(data.cardByOracleId);
  useDocumentTitle(card?.name);

  useEffect(() => {
    setTimeout(() => window.scrollTo(0, 0), 100);
  }, [oracle_id]);

  if (!data?.cardByOracleId && !loading) {
    return <NotFound message="This card does not seem to exists..." />;
  }

  return (
    <PageLayout>
      <PageCard>
        <CardDetailsDesktop card={card} loading={loading} largeHeader />
      </PageCard>
    </PageLayout>
  );
};
