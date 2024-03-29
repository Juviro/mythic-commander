import AddToWantsList from 'components/Desktop/WantsList/AddToWantsList';
import { PageCard } from 'components/Elements/Desktop/PageLayout';
import Flex from 'components/Elements/Shared/Flex';
import WantsListDeckLink from 'components/Elements/Shared/WantsListDeckLink';
import ListStats from 'components/Elements/Shared/ListStats';
import WantsListTitle from 'components/Elements/Shared/WantsListTitle';
import React from 'react';
import {
  CardInputType,
  MutationAddCardsToWantsListArgs,
  WantsList,
  WantsListCard,
} from 'types/graphql';

import { useMutation } from '@apollo/client';

import { useParams } from 'react-router';
import { UnifiedWantsList } from 'types/unifiedTypes';
import Actions from './Actions';
import message from '../../../utils/message';
import { addCardsToWantsListDesktop, wantsListDesktop } from './queries';

interface Props {
  wantsList: UnifiedWantsList;
  loading: boolean;
  canEdit: boolean;
}

export default ({ wantsList, loading, canEdit }: Props) => {
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
      title={<WantsListTitle wantsList={wantsList} level={3} canEdit={canEdit} />}
      loading={loading}
      extra={
        wantsList && (
          <Actions wantsList={wantsList} onAddCards={onAddCards} canEdit={canEdit} />
        )
      }
    >
      <Flex direction="row" justify="space-between" wrap="wrap">
        <Flex direction="row" wrap="wrap">
          <WantsListDeckLink wantsList={wantsList} large canEdit={canEdit} />
          <ListStats list={wantsList} style={{ marginLeft: 8 }} />
        </Flex>
        {canEdit && (
          <Flex align="flex-end">
            <AddToWantsList cards={wantsList?.cards} onAddCards={onAddCards} />
          </Flex>
        )}
      </Flex>
    </PageCard>
  );
};
