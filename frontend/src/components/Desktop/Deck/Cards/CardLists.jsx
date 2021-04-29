import React from 'react';
import styled from 'styled-components';
import { useMutation } from 'react-apollo';

import { getListStats } from 'utils/getListStats';
import { lightText } from 'constants/colors';
import message from 'utils/message';
import { CloseOutlined } from '@ant-design/icons';
import sumCardAmount from 'utils/sumCardAmount';
import { Flex, CardGrid, CommanderPicker } from '../../../Elements/Shared';
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
    const isCommander = type === 'Commander';
    const numberOfCardsLabel = isCommander ? '' : `(${sumCardAmount(cards)})`;

    const getListHeading = () => {
      if (!isCommander || !cards[0]) return type;
      return `Commander - ${cards.map(({ name }) => name).join(' & ')}`;
    };

    const title = (
      <Flex direction="column">
        <span>{`${getListHeading()} ${numberOfCardsLabel}`}</span>
        <StyledSubtitle>
          {cards.length ? `${valueLabelUsd} | ${valueLabelEur}` : ''}
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

    return { title, cards, key: type, additionalElements, additionalActions };
  });

  const allCardsInOrder = cardsByType?.map(({ cards }) => cards).flat();

  return (
    <CardGrid
      hidePagination
      loading={loading}
      cards={allCardsInOrder}
      cardLists={cardLists}
      deleteByOracle={deleteByOracle(true)}
      onEditCard={onEditCard}
      showAddedBeforeFilter
      showCollectionFilters
      orderByParamName="orderByAdvanced"
      dragProps={{
        canDrag: true,
        onSuccessfullDrop: (card) => deleteByOracle(false)([card.oracle_id], 1),
        listId: deck?.id,
      }}
    />
  );
};
