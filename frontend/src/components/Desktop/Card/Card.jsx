import React from 'react';
import styled from 'styled-components';
import { useQuery } from 'react-apollo';
import { useParams } from 'react-router';

import CardDetailsDesktop from '../../Elements/Desktop/CardDetailsDesktop';
import { cardDetailsDesktop } from '../../Elements/Desktop/CardDetailsDesktop/queries';
import { unifySingleCard } from '../../../utils/unifyCardFormat';
import { lightBackground } from '../../../constants/colors';

const StyledOuterWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  height: calc(100% - 46px);
  background-color: ${lightBackground};
`;

const StyledWrapper = styled.div`
  height: 100%;
  padding: 16px;
  overflow: auto;
  max-width: 1200px;
  background-color: white;
  box-shadow: rgb(208, 208, 208) 0px 5px 5px 3px;
`;

export default () => {
  const { oracle_id } = useParams();
  const { data, loading } = useQuery(cardDetailsDesktop, {
    variables: { oracle_id },
  });
  const card = data && unifySingleCard(data.cardByOracleId);

  return (
    <StyledOuterWrapper>
      <StyledWrapper>
        <CardDetailsDesktop card={card} loading={loading} largeHeader />
      </StyledWrapper>
    </StyledOuterWrapper>
  );
};
