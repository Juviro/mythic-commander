import React from 'react';
import styled from 'styled-components';
import { useMutation } from 'react-apollo';

import { getListStats } from 'utils/getListStats';
import { lightText } from 'constants/colors';
import message from 'utils/message';
import { CloseOutlined } from '@ant-design/icons';
import sumCardAmount from 'utils/sumCardAmount';
import Flex from 'components/Elements/Shared/Flex';
import CardGrid from 'components/Elements/Shared/CardGrid';
import CommanderPicker from 'components/Elements/Shared/CommanderPicker';
import { deleteFromDeckDesktop, editDeckCardDesktop, getDeckDesktop } from '../queries';

const StyledSubtitle = styled.span`
  font-size: 12px;
  height: 16px;
  color: ${lightText};
`;

export default ({ loading, cardsByType, deck }) => {
  const [mutateDelete] = useMutation(deleteFromDeckDesktop);
  const [mutateEdit] = useMutation(editDeckCardDesktop);

  const deleteByOracle = (displayMessage) => (oracleIds, numberOfCards) => {
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

    if (displayMessage) {
      message(`Deleted <b>${numberOfCards}</b> card(s) from your Deck!`);
    }
  };

  const onEditCard = (cardId, newProps) => {
    const card = deck.originalCards.find(
      (originalCard) => originalCard.card.id === cardId
    );
    mutateEdit({
      variables: { deckId: deck.id, newProps, cardId },
      optimisticResponse: () => ({
        __typename: 'Mutation',
        editDeckCard: {
          ...card,
          ...newProps,
        },
      }),
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

  const onSetTags = (cardId, tags) => {
    onEditCard(cardId, { tags });
  };

  const allTags = [
    ...new Set(
      deck?.cards
        .map(({ tags }) => tags)
        .filter(Boolean)
        .flat()
    ),
  ];

  const cardLists = cardsByType?.map(({ type, cards, titleColor }) => {
    const { valueLabelEur, valueLabelUsd } = getListStats({ cards });
    const isCommander = type === 'Commander';
    const numberOfCardsLabel = isCommander ? '' : `(${sumCardAmount(cards)})`;

    const getListHeading = () => {
      if (!isCommander || !cards[0]) return type;
      return `Commander - ${cards.map(({ name }) => name).join(' & ')}`;
    };

    const title = (
      <Flex direction="column" style={{ color: titleColor ?? 'black' }}>
        <span>{`${getListHeading()} ${numberOfCardsLabel}`}</span>
        <StyledSubtitle>
          {cards.length && deck.canEdit ? `${valueLabelUsd} | ${valueLabelEur}` : ''}
        </StyledSubtitle>
      </Flex>
    );

    const additionalElements = isCommander ? <CommanderPicker deck={deck} /> : undefined;
    const additionalActions = isCommander
      ? [
          {
            Icon: CloseOutlined,
            title: 'Remove Commander',
            onClick: (card) => onEditCard(card.id, { isCommander: false }),
          },
        ]
      : undefined;

    return {
      title,
      type,
      color: titleColor,
      cards,
      key: type,
      additionalElements,
      additionalActions,
    };
  });

  const allCardsInOrder = cardsByType?.map(({ cards }) => cards).flat();

  return (
    <CardGrid
      hidePagination
      loading={loading}
      cards={allCardsInOrder}
      cardLists={cardLists}
      deleteByOracle={deck?.canEdit ? deleteByOracle(true) : undefined}
      onEditCard={deck?.canEdit ? onEditCard : undefined}
      showAddedBeforeFilter
      showCollectionFilters
      allTags={allTags}
      onSetTags={onSetTags}
      orderByParamName="orderByAdvanced"
      dragProps={{
        canDrag: true,
        onSuccessfullDrop: (card) => deleteByOracle(false)([card.oracle_id], 1),
        listId: deck?.id,
      }}
    />
  );
};
