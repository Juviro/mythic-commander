import React, { useEffect } from 'react';
import { useQuery } from 'react-apollo';
import { useParams } from 'react-router';

import { PageCard, PageLayout } from 'components/Elements/Desktop';
import useDocumentTitle from 'components/Hooks/useDocumentTitle';
import CardDetailsDesktop from '../../Elements/Desktop/CardDetailsDesktop';
import { cardDetailsDesktop } from '../../Elements/Desktop/CardDetailsDesktop/queries';
import { unifySingleCard } from '../../../utils/unifyCardFormat';

export default () => {
  const { oracle_id } = useParams();
  const { data, loading } = useQuery(cardDetailsDesktop, {
    variables: { oracle_id },
    fetchPolicy: 'network-only',
  });
  const card = data && unifySingleCard(data.cardByOracleId);
  useDocumentTitle(card?.name);

  useEffect(() => {
    setTimeout(() => window.scrollTo(0, 0), 100);
  }, [oracle_id]);

  return (
    <PageLayout>
      <PageCard>
        <CardDetailsDesktop card={card} loading={loading} largeHeader />
      </PageCard>
    </PageLayout>
  );
};
