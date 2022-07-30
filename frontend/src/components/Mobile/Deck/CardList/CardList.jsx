import React from 'react';
import { withRouter, useParams } from 'react-router';
import styled from 'styled-components';
import { useMutation, useQuery } from '@apollo/client';
import { Skeleton } from 'antd';

import message from 'utils/message';
import LayoutAndSortPicker from 'components/Elements/Shared/LayoutAndSortPicker';
import CardSubList from './CardSubList';
import {
  deleteFromDeck,
  editDeckCard,
  getDeck,
  wantsListsNamesForDeckMobile,
} from '../queries';
import getCardsByType from '../../../../utils/getCardsByType';

const StyledWrapper = styled.div`
  padding: 0 16px 32px;
`;

const DeckList = ({ deck, loading }) => {
  const { id: deckId } = useParams();
  const [mutateDelete] = useMutation(deleteFromDeck);
  const [mutateEdit] = useMutation(editDeckCard);
  const { data } = useQuery(wantsListsNamesForDeckMobile, {
    variables: { deckId },
  });

  const cards = deck && deck.cards;

  const { cardsByType = [], commander } = getCardsByType(cards);

  const onDeleteCard = (cardId) => {
    mutateDelete({
      variables: { cardId, deckId: deck.id },
    });
  };

  const deleteByOracle = (oracleIds) => {
    oracleIds.forEach((oracleId) => {
      const { id, name } = deck.cards.find(({ oracle_id }) => oracle_id === oracleId);
      message(`Deleted <b>${name}</b> from ${deck.name}!`);
      onDeleteCard(id);
    });
  };

  const onEditCard = (cardId, newProps) => {
    mutateEdit({
      variables: { deckId: deck.id, newProps, cardId },
      update: (cache, { data: { editDeckCard: newCard } }) => {
        const existing = cache.readQuery({
          query: getDeck,
          variables: { id: deck.id },
        });

        const newCards = existing.deck.cards.map((card) => {
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
      <LayoutAndSortPicker showCollectionFilters />
      <div style={{ marginTop: 16 }}>
        <Skeleton loading={loading} active>
          {cardsByType.map((cardGroup) => (
            <CardSubList
              {...cardGroup}
              key={cardGroup.type}
              moveToList={moveToList}
              commander={commander}
              onEditCard={onEditCard}
              onDeleteCard={onDeleteCard}
              deleteByOracle={deleteByOracle}
            />
          ))}
        </Skeleton>
      </div>
    </StyledWrapper>
  );
};

export default withRouter(DeckList);
