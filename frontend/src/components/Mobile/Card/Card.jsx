import React from 'react';
import styled from 'styled-components';
import { useQuery } from 'react-apollo';

import { useParams } from 'react-router';
import { getCard } from '../../../queries';
import CardOverview from './CardOverview';

const StyledWrapper = styled.div`
  width: 100%;
  display: flex;
  min-height: 100px;
  align-items: center;
  flex-direction: column;
  justify-content: center;
`;

export default () => {
  const { id } = useParams();
  const { data, loading } = useQuery(getCard, { variables: { id } });
  const card = data && data.card;

  return (
    <StyledWrapper>
      <CardOverview card={card} loading={loading} />
    </StyledWrapper>
  );
};
