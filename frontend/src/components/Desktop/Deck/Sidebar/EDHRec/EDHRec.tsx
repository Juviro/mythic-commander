import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { UnifiedDeck } from 'types/unifiedTypes';
import { QueryEdhrecCardsArgs, Query } from 'types/graphql';
import { Divider, Empty } from 'antd';
import styled from 'styled-components';
import { getEdhrecCards } from './queries';
import { CardLists } from './CardLists';
import { Title } from './Title';
import { LazyRender } from '../LazyRender';
import { ThemePicker } from './ThemePicker';
import { PriceInfoAlert } from './PriceInfoAlert';

const StyledWrapper = styled.div`
  padding: 16px;
`;

const StyledEmpty = styled(Empty)`
  margin-top: 48px;
`;

interface Props {
  deck: UnifiedDeck;
}

const EDHRecComponent = ({ deck }: Props) => {
  const [themeSuffix, setThemeSuffix] = useState<string | null>(null);

  const commanders = deck.cards.filter(({ isCommander }) => isCommander);
  const commanderNames = commanders.map(({ name }) => name);

  const { data, loading } = useQuery<Query, QueryEdhrecCardsArgs>(getEdhrecCards, {
    variables: { names: commanderNames, themeSuffix },
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
      <Divider />
      <ThemePicker
        loading={loading}
        themes={data?.edhrecCards?.themes}
        themeSuffix={themeSuffix}
        setThemeSuffix={setThemeSuffix}
      />
      <Divider />
      <CardLists lists={data?.edhrecCards?.cardLists} loading={loading} deck={deck} />
      <PriceInfoAlert />
    </StyledWrapper>
  );
};

export const EDHRec = ({ visible, ...props }: Props & { visible: boolean }) => {
  return (
    <LazyRender visible={visible}>
      <EDHRecComponent {...props} />
    </LazyRender>
  );
};
