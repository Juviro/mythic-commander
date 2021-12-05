import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useQuery, useMutation } from 'react-apollo';

import { MutationAddCardsToDeckArgs, CardInputType, Query } from 'types/graphql';
import { UnifiedDeck } from 'types/unifiedTypes';
import { PageCard, PageLayout } from 'components/Elements/Desktop';
import useDocumentTitle from 'components/Hooks/useDocumentTitle';
import { StringParam, useQueryParam } from 'use-query-params';
import { getColorIdentity } from 'utils/commander';
import Flex from 'components/Elements/Shared/Flex';
import NotFound from 'components/Elements/Shared/NotFound';
import ShortcutFocus from 'components/Elements/Shared/ShortcutFocus';
import Cards from './Cards';
import message from '../../../utils/message';
import unifyCardFormat from '../../../utils/unifyCardFormat';
import { getDeckDesktop, addCardsToDeckDesktop } from './queries';
import sumCardAmount from '../../../utils/sumCardAmount';
import { DeckBreakdown } from './DeckBreakdown/DeckBreakdown';
import DeckActions from './Header/DeckActions';
import Title from './Header/Title';
import { ActionBar } from './ActionBar/ActionBar';
import { DeckSettings } from './DeckSettings/DeckSettings';

export type View = 'type' | 'tags';

export default () => {
  const { id } = useParams<{ id: string }>();
  const { data, loading } = useQuery<Query>(getDeckDesktop, {
    variables: { id },
    fetchPolicy: 'network-only',
  });
  const [mutate] = useMutation<any, MutationAddCardsToDeckArgs>(addCardsToDeckDesktop);

  const [view, setView] = useState<View>('type');

  const deck = data?.deck;
  const cards = unifyCardFormat(deck?.cards);
  useDocumentTitle(deck?.name);

  const unifiedDeck: UnifiedDeck = deck && {
    ...deck,
    originalCards: deck.cards,
    cards,
  };

  const [, setColors] = useQueryParam('colors', StringParam);

  const colorIdentityString = getColorIdentity(unifiedDeck?.cards).join('');

  useEffect(() => {
    if (!deck) return;
    if (!colorIdentityString.length) return;
    // Preselect color identity of the deck and exclude other colors
    setColors(`-${colorIdentityString.toLowerCase()}`);
    // eslint-disable-next-line
  }, [colorIdentityString]);

  if (!data && !loading) {
    return <NotFound message="This deck does not seem to exist.." />;
  }

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
          extra={
            deck?.canEdit ? (
              <DeckActions deck={unifiedDeck} onAddCards={onAddCards} />
            ) : null
          }
          style={{ height: 'calc(100% - 80px)', marginBottom: 70 }}
        >
          <DeckSettings view={view} setView={setView} />
          <Flex>
            <Cards
              deck={unifiedDeck}
              loading={loading}
              onAddCards={onAddCards}
              view={view}
            />
            <DeckBreakdown deck={unifiedDeck} />
          </Flex>
        </PageCard>
        {deck?.canEdit && <ActionBar onAddCards={onAddCards} deck={unifiedDeck} />}
      </PageLayout>
    </ShortcutFocus>
  );
};
