import React, { useState } from 'react';
import { Empty } from 'antd';
import { useMutation } from '@apollo/react-hooks';

import { Confirm, CardGrid } from 'components/Elements/Shared';

import { WantsList, MutationDeleteFromWantsListArgs, CardInputType } from 'types/graphql';
import unifyCardFormat from 'utils/unifyCardFormat';
import { UnifiedCard } from 'types/unifiedTypes';

import sumCardAmount from 'utils/sumCardAmount';
import boldText from 'utils/boldText';
import styled from 'styled-components';
import { sortByCmc } from 'utils/cardFilter';
import { deleteFromWantsList } from './queries';

const StyledDeckWantsList = styled.div`
  display: flex;
  flex-direction: column;
`;

interface Props {
  wantsList: WantsList;
  alreadyInDeck: (card: UnifiedCard) => boolean;
  onAddCards: (newCards: CardInputType[], name: string) => void;
}

export default ({ wantsList, alreadyInDeck, onAddCards }: Props) => {
  const [mutate] = useMutation<any, MutationDeleteFromWantsListArgs>(deleteFromWantsList);

  const [cardToAdd, setCardToAdd] = useState<UnifiedCard | null>(null);

  const cards = unifyCardFormat(wantsList.cards);

  const onDeleteFromList = (card: UnifiedCard) => {
    const newCards = wantsList.cards.filter(
      ({ card: { oracle_id } }) => oracle_id !== card.oracle_id
    );
    const newNumberOfCards = sumCardAmount(newCards);
    mutate({
      variables: { oracleIds: [card.oracle_id], wantsListId: wantsList.id },
      optimisticResponse: () => ({
        __typename: 'Mutation',
        deleteFromWantsList: {
          ...wantsList,
          cards: newCards,
          numberOfCards: newNumberOfCards,
        },
      }),
    });
  };

  const onAddCard = () => {
    onDeleteFromList(cardToAdd);
    onAddCards([{ id: cardToAdd.id, amount: 1 }], cardToAdd.name);
    setCardToAdd(null);
  };

  if (!cards.length) {
    return <Empty description="" style={{ margin: 16 }} />;
  }

  const sortedCards = sortByCmc([...cards]);

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
          onSuccessfullDrop: onDeleteFromList,
          listId: wantsList.id,
        }}
        hidePagination
        cards={sortedCards}
        markAsDisabled={alreadyInDeck}
      />
    </StyledDeckWantsList>
  );
};
