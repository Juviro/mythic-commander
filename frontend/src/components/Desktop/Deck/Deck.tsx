import React from 'react';
import { useParams } from 'react-router';
import { useQuery, useMutation } from 'react-apollo';

import { MutationAddCardsToDeckArgs, CardInputType, Query } from 'types/graphql';
import { UnifiedDeck } from 'types/unifiedTypes';
import { PageCard, PageLayout } from 'components/Elements/Desktop';
import Cards from './Cards';
import message from '../../../utils/message';
import unifyCardFormat from '../../../utils/unifyCardFormat';
import { getDeckDesktop, addCardsToDeckDesktop } from './queries';
import { Flex, NotFound, ShortcutFocus } from '../../Elements/Shared';
import sumCardAmount from '../../../utils/sumCardAmount';
import { DeckBreakdown } from './DeckBreakdown/DeckBreakdown';
import DeckActions from './Header/DeckActions';
import Title from './Header/Title';
import { ActionBar } from './ActionBar/ActionBar';

export default () => {
  const { id } = useParams<{ id: string }>();
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
        <PageCard
          title={<Title deck={unifiedDeck} />}
          extra={<DeckActions deck={unifiedDeck} onAddCards={onAddCards} />}
          style={{ height: 'calc(100% - 80px)', marginBottom: 70 }}
        >
          <Flex>
            <Cards deck={unifiedDeck} loading={loading} onAddCards={onAddCards} />
            <DeckBreakdown deck={unifiedDeck} />
          </Flex>
        </PageCard>
        <ActionBar onAddCards={onAddCards} deck={unifiedDeck} />
      </PageLayout>
    </ShortcutFocus>
  );
};
