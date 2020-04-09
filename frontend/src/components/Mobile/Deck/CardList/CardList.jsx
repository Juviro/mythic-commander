import React from 'react';
import { withRouter, useParams } from 'react-router';
import styled from 'styled-components';
import { useMutation, useQuery } from 'react-apollo';
import { Skeleton } from 'antd';
import CardSubList from './CardSubList';
import { LayoutAndSortPicker } from '../../../Elements/Shared';
import {
  deleteFromDeck,
  editDeckCard,
  getDeck,
  wantsListsNamesForDeckMobile,
} from '../queries';

const CARD_TYPES = [
  'Commander',
  'Creature',
  'Enchantment',
  'Artifact',
  'Instant',
  'Sorcery',
  'Planeswalker',
  'Land',
];

const StyledWrapper = styled.div`
  padding: 0 16px 32px;
`;

const addMainType = card => {
  const mainType = card.isCommander
    ? 'Commander'
    : CARD_TYPES.find(type => card.primaryTypes.includes(type));
  return {
    ...card,
    mainType,
  };
};

const DeckList = ({ deck, loading }) => {
  const { id: deckId } = useParams();
  const [mutateDelete] = useMutation(deleteFromDeck);
  const [mutateEdit] = useMutation(editDeckCard);
  const { data } = useQuery(wantsListsNamesForDeckMobile, {
    variables: { deckId },
  });

  const cards = deck ? deck.cards : [];
  const cardWithMainType = cards.map(addMainType);
  const cardsByType = CARD_TYPES.map(type => ({
    type,
    cards: cardWithMainType.filter(card => card.mainType === type),
  }));
  const commander = cards.find(({ isCommander }) => isCommander);

  const onDeleteCard = cardId => {
    const newCards = deck.cards.filter(card => card.id !== cardId);
    const newNumberOfCards = deck.numberOfCards;
    mutateDelete({
      variables: { cardId, deckId: deck.id },
      optimisticResponse: () => ({
        __typename: 'Mutation',
        deleteFromWantsList: {
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
      update: (cache, { data }) => {
        const existing = cache.readQuery({
          query: getDeck,
          variables: { id: deck.id },
        });
        const { editDeckCard: newCard } = data;

        const newCards = existing.deck.cards.map(card => {
          if (card.card.id !== cardId) return card;
          return newCard;
        });

        cache.writeQuery({
          query: getDeck,
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

  const moveToList = data
    ? {
        list: {
          wantsLists: data.wantsLists,
        },
        originType: 'DECK',
        originId: deckId,
      }
    : null;

  return (
    <StyledWrapper>
      <LayoutAndSortPicker />
      <div style={{ marginTop: 16 }}>
        <Skeleton loading={loading} active>
          {cardsByType.map(cardGroup => (
            <CardSubList
              {...cardGroup}
              moveToList={moveToList}
              key={cardGroup.type}
              commander={commander}
              onEditCard={onEditCard}
              onDeleteCard={onDeleteCard}
            />
          ))}
        </Skeleton>
      </div>
    </StyledWrapper>
  );
};

export default withRouter(DeckList);
