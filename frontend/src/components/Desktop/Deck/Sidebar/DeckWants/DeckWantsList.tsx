import React, { useState } from 'react';

import CardGrid from 'components/Elements/Shared/CardGrid';
import Confirm from 'components/Elements/Shared/Confirm';

import { CardInputType } from 'types/graphql';
import { UnifiedCard, UnifiedDeck, UnifiedWantsList } from 'types/unifiedTypes';

import boldText from 'utils/boldText';
import styled from 'styled-components';
import { sortByAdded } from 'utils/cardFilter';

const StyledDeckWantsList = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
`;

interface Props {
  wantsList: UnifiedWantsList;
  deck: UnifiedDeck;
  onAddCardsToDeck: (newCards: CardInputType[], name: string) => void;
  onDeleteCard: (card: UnifiedCard) => void;
  onDeletebyOracle: (oracleIds: string[]) => void;
  onEditCard: (card: UnifiedCard) => void;
}

export default ({
  wantsList,
  deck,
  onAddCardsToDeck,
  onDeleteCard,
  onDeletebyOracle,
  onEditCard,
}: Props) => {
  const cardNames = deck?.cards.map(({ name }) => name);
  const alreadyInDeck = ({ name }) => cardNames?.includes(name);
  const sortedCards = wantsList && sortByAdded([...(wantsList?.cards || [])]);

  const [cardToAdd, setCardToAdd] = useState<UnifiedCard | null>(null);

  const onAddCard = () => {
    onDeleteCard(cardToAdd);
    onAddCardsToDeck([{ id: cardToAdd.id, amount: 1 }], cardToAdd.name);
    setCardToAdd(null);
  };

  return (
    <StyledDeckWantsList>
      {cardToAdd && (
        <Confirm
          onOk={onAddCard}
          onCancel={() => setCardToAdd(null)}
          okText="Add"
          title={boldText(`Add <b>${cardToAdd.name}</b> to your deck?`)}
        />
      )}
      <CardGrid
        dragProps={{
          canDrag: true,
          onSuccessfullDrop: onDeleteCard,
          listId: wantsList?.id,
        }}
        loading={!wantsList}
        hidePagination
        cards={sortedCards}
        onEditCard={onEditCard}
        smallSelectionMenu
        deleteByOracle={onDeletebyOracle}
        markAsDisabled={alreadyInDeck}
      />
    </StyledDeckWantsList>
  );
};
