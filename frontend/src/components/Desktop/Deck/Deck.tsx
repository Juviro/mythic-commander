import React, { useState } from 'react';
import { useParams } from 'react-router';
import { useQuery, useMutation } from 'react-apollo';

import { MutationAddCardsToDeckArgs, CardInputType, Query } from 'types/graphql';
import { UnifiedDeck } from 'types/unifiedTypes';
import { PageCard, PageLayout } from 'components/Elements/Desktop';
import { Affix, Typography } from 'antd';
import Cards from './Cards';
import Sidebar from './Sidebar';
import Header from './Header/Header';
import message from '../../../utils/message';
import unifyCardFormat from '../../../utils/unifyCardFormat';
import { getDeckDesktop, addCardsToDeckDesktop } from './queries';
import { Flex, NotFound, ShortcutFocus } from '../../Elements/Shared';
import sumCardAmount from '../../../utils/sumCardAmount';
import { DeckStats } from './DeckStats/DeckStats';

export default () => {
  const { id } = useParams<{ id: string }>();
  const [currentTab, setCurrentTab] = useState<string>('add');
  const { data, loading } = useQuery<Query>(getDeckDesktop, {
    variables: { id },
    fetchPolicy: 'network-only',
  });
  const [mutate] = useMutation<any, MutationAddCardsToDeckArgs>(addCardsToDeckDesktop);

  if (!data && !loading) {
    return <NotFound message="This deck does not seem to exist.." />;
  }

  const deck = data?.deck;
  const cards = unifyCardFormat(deck?.cards);

  const unifiedDeck: UnifiedDeck = deck && {
    ...deck,
    originalCards: deck.cards,
    cards,
  };

  const onAddCards = (newCards: CardInputType[], name: string) => {
    const addedLabel = name || `${sumCardAmount(newCards)} cards`;
    message(`Added <b>${addedLabel}</b> to your deck!`);
    mutate({
      variables: { cards: newCards, deckId: id },
    });
  };

  return (
    <ShortcutFocus
      focusId="deck.cards"
      style={{ overflow: 'auto', flex: 1, height: '100%' }}
    >
      <PageLayout large>
        <Header deck={unifiedDeck} loading={loading} onAddCards={onAddCards} />
        <Affix offsetTop={160}>
          <PageCard>
            <Typography.Title level={3}>Cards</Typography.Title>
          </PageCard>
        </Affix>
        <PageCard style={{ marginTop: 0 }}>
          <Flex>
            <Cards deck={unifiedDeck} loading={loading} onAddCards={onAddCards} />
            <DeckStats />
            {/* <Sidebar
              currentTab={currentTab}
              setCurrentTab={setCurrentTab}
              onAddCards={onAddCards}
              deck={unifiedDeck}
            /> */}
          </Flex>
        </PageCard>
      </PageLayout>
    </ShortcutFocus>
  );
};
