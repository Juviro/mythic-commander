import AddToWantsList from 'components/Desktop/WantsList/AddToWantsList';
import { PageCard } from 'components/Elements/Desktop';
import {
  Flex,
  WantsListDeckLink,
  WantsListStats,
  WantsListTitle,
} from 'components/Elements/Shared';
import React from 'react';
import {
  CardInputType,
  MutationAddCardsToWantsListArgs,
  WantsList,
  WantsListCard,
} from 'types/graphql';

import { useMutation } from 'react-apollo';

import { useParams } from 'react-router';
import { UnifiedWantsList } from 'types/unifiedTypes';
import Actions from './Actions';
import message from '../../../utils/message';
import { addCardsToWantsListDesktop, wantsListDesktop } from './queries';

interface Props {
  wantsList: UnifiedWantsList;
  loading: boolean;
}

export default ({ wantsList, loading }: Props) => {
  const { id: wantsListId } = useParams<{ id: string }>();
  const [mutate] = useMutation<any, MutationAddCardsToWantsListArgs>(
    addCardsToWantsListDesktop
  );

  const onAddCards = (cards: CardInputType[], name?: string) => {
    const addedName = name || `${cards.length} cards`;
    message(`Added <b>${addedName}</b>!`);
    mutate({
      variables: {
        wantsListId,
        cards,
      },
      update: (cache, { data }) => {
        if (!data) return;
        const { addCardsToWantsList: newCards } = data;
        const existing = cache.readQuery<{ wantsList: WantsList }>({
          query: wantsListDesktop,
          variables: { id: wantsListId },
        });

        const existingCards = existing.wantsList.cards.filter(
          ({ card: { oracle_id } }) =>
            !newCards.some(
              (newCard: WantsListCard) => newCard.card.oracle_id === oracle_id
            )
        );

        cache.writeQuery({
          query: wantsListDesktop,
          data: {
            wantsList: {
              ...existing.wantsList,
              cards: existingCards.concat(newCards),
            },
          },
        });
      },
    });
  };

  return (
    <PageCard
      style={{ height: 'auto' }}
      title={<WantsListTitle wantsList={wantsList} level={3} />}
      loading={loading}
      extra={wantsList && <Actions wantsList={wantsList} onAddCards={onAddCards} />}
    >
      <Flex direction="row" justify="space-between" wrap="wrap">
        <Flex direction="row" wrap="wrap">
          <WantsListDeckLink wantsList={wantsList} large />
          <WantsListStats wantsList={wantsList} />
        </Flex>
        <Flex align="flex-end">
          <AddToWantsList cards={wantsList?.cards} onAddCards={onAddCards} />
        </Flex>
      </Flex>
    </PageCard>
  );
};
