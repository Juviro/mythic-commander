import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useQuery } from 'react-apollo';
import { useParams } from 'react-router';

import { PageCard, PageLayout } from 'components/Elements/Desktop';
import CardDetailsDesktop from '../../Elements/Desktop/CardDetailsDesktop';
import { cardDetailsDesktop } from '../../Elements/Desktop/CardDetailsDesktop/queries';
import { unifySingleCard } from '../../../utils/unifyCardFormat';
import { lightBackground } from '../../../constants/colors';

const StyledOuterWrapper = styled.div`
  width: 100%;
  display: flex;
  min-height: 100%;
  justify-content: center;
  background-color: ${lightBackground};
`;

const StyledWrapper = styled.div`
  height: fit-content;
  padding: 16px;
  margin: 16px;
  overflow: auto;
  max-width: 1200px;
  background-color: white;
  box-shadow: rgb(208, 208, 208) 0px 0px 7px 3px;
`;

export default () => {
  const { oracle_id } = useParams();
  const { data, loading } = useQuery(cardDetailsDesktop, {
    variables: { oracle_id },
    fetchPolicy: 'network-only',
  });
  const card = data && unifySingleCard(data.cardByOracleId);

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
