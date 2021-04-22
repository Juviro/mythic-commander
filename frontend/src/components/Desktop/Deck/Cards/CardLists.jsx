import React from 'react';
import styled from 'styled-components';
import { useMutation } from 'react-apollo';

import { getListStats } from 'utils/getListStats';
import { lightText } from 'constants/colors';
import { Flex, CardGrid } from '../../../Elements/Shared';
import { deleteFromDeckDesktop, editDeckCardDesktop, getDeckDesktop } from '../queries';

const StyledSubtitle = styled.span`
  font-size: 12px;
  color: ${lightText};
`;

export default ({ loading, cardsByType, deck }) => {
  const [mutateDelete] = useMutation(deleteFromDeckDesktop);
  const [mutateEdit] = useMutation(editDeckCardDesktop);

  const deleteByOracle = (oracleIds, numberOfCards) => {
    const cardsToDelete = deck.cards.filter(({ oracle_id }) =>
      oracleIds.includes(oracle_id)
    );
    const cardIds = cardsToDelete.map(({ id }) => id);

    const newCards = deck.originalCards.filter(({ card }) => !cardIds.includes(card.id));
    const newNumberOfCards = deck.numberOfCards - numberOfCards;

    mutateDelete({
      variables: { cardIds, deckId: deck.id },
      optimisticResponse: () => ({
        __typename: 'Mutation',
        deleteFromDeck: {
          ...deck,
          cards: newCards,
          numberOfCards: newNumberOfCards,
        },
      }),
    });
  };

  const onEditCard = (cardId, newProps) => {
    mutateEdit({
      variables: { deckId: deck.id, newProps, cardId },
      update: (cache, { data: { editDeckCard: newCard } }) => {
        const existing = cache.readQuery({
          query: getDeckDesktop,
          variables: { id: deck.id },
        });

        const newCards = existing.deck.cards.map((deckCard) => {
          if (deckCard.card.id !== cardId) return deckCard;
          return newCard;
        });

        cache.writeQuery({
          query: getDeckDesktop,
          data: {
            deck: {
              ...existing.deck,
              cards: newCards,
            },
          },
        });
      },
    });
  };

  const cardLists = cardsByType?.map(({ type, cards }) => {
    const { valueLabelEur, valueLabelUsd } = getListStats({ cards });
    const numberOfCardsLabel = type === 'Commander' ? '' : `(${cards.length})`;
    const listTitle = type === 'Commander' ? `Commander - ${cards[0]?.name}` : type;

    const title = (
      <Flex direction="column">
        <span>{`${listTitle} ${numberOfCardsLabel}`}</span>
        <StyledSubtitle>{`${valueLabelUsd} | ${valueLabelEur}`}</StyledSubtitle>
      </Flex>
    );
    return { title, cards, key: type };
  });

  const allCardsInOrder = cardsByType?.map(({ cards }) => cards).flat();

  return (
    <CardGrid
      hidePagination
      loading={loading}
      cards={allCardsInOrder}
      cardLists={cardLists}
      deleteByOracle={deleteByOracle}
      onEditCard={onEditCard}
      showAddedBeforeFilter
      showCollectionFilters
      orderByParamName="orderByAdvanced"
    />
  );
};
