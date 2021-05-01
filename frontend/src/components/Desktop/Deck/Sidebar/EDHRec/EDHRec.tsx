import React from 'react';
import { useQuery } from 'react-apollo';
import { UnifiedDeck } from 'types/unifiedTypes';
import { QueryEdhrecCardsArgs, Query } from 'types/graphql';
import { Empty } from 'antd';
import styled from 'styled-components';
import { OneTimeInfoBox } from 'components/Elements/Shared';
import { getEdhrecCards } from './queries';
import { CardLists } from './CardLists';
import { Title } from './Title';

const StyledWrapper = styled.div`
  padding: 16px;
`;

const StyledEmpty = styled(Empty)`
  margin-top: 48px;
`;

interface Props {
  deck: UnifiedDeck;
}

export const EDHRec = ({ deck }: Props) => {
  const commanders = deck.cards.filter(({ isCommander }) => isCommander);
  const commanderNames = commanders.map(({ name }) => name);

  const { data, loading } = useQuery<Query, QueryEdhrecCardsArgs>(getEdhrecCards, {
    variables: { names: commanderNames },
    fetchPolicy: 'cache-first',
  });

  if (!commanders.length) {
    return (
      <StyledEmpty description="Pick a commander to see suggested cards from EDHREC" />
    );
  }

  return (
    <StyledWrapper>
      <Title commanders={commanders} />
      <CardLists lists={data?.edhrecCards} loading={loading} deck={deck} />
      <OneTimeInfoBox
        id="deck.edhrec.priceInfo"
        style={{ marginTop: 24 }}
        showIcon
        message={`
          Please note: All prices displayed in this list are taken from EDHREC 
          and may vary from the prices displayed in the rest of the app, which 
          are provided by scryfall.
        `}
      />
    </StyledWrapper>
  );
};
