import React, { useContext, useState } from 'react';
import { useMutation } from '@apollo/react-hooks';

import { CardGrid, Dropzone } from 'components/Elements/Desktop';
import { OneTimeInfoBox, Confirm } from 'components/Elements/Shared';
import FocusContext from 'components/Provider/FocusProvider/FocusProvider';

import { WantsList, MutationDeleteFromWantsListArgs, CardInputType } from 'types/graphql';
import unifyCardFormat from 'utils/unifyCardFormat';
import { UnifiedCard } from 'types/unifiedTypes';

import sumCardAmount from 'utils/sumCardAmount';
import boldText from 'utils/boldText';
import { Empty } from 'antd';
import { deleteFromWantsList } from './queries';

interface Props {
  wantsList: WantsList;
  alreadyInDeck: (card: UnifiedCard) => boolean;
  onAddCards: (newCards: CardInputType[], name: string) => void;
  active: boolean;
}

export default ({ wantsList, alreadyInDeck, onAddCards, active }: Props) => {
  const [mutate] = useMutation<any, MutationDeleteFromWantsListArgs>(deleteFromWantsList);
  const { focusedElements } = useContext(FocusContext);
  // check if this has focus
  const blockShortcuts =
    !active ||
    focusedElements.filter((focusId) => focusId !== 'modal.cardDetails').pop() !==
      'deck.sidebar.wants';

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
  const onEnter = blockShortcuts ? null : (card: UnifiedCard) => setCardToAdd(card);

  const onAddToWantsList = (card) => {
    console.log('card :', card);
  };

  if (!cards.length) {
    return <Empty description="" style={{ marginBottom: 16 }} />;
  }

  return (
    <>
      {/* <Dropzone onDrop={onAddToWantsList}> */}
      {cardToAdd && (
        <Confirm
          onOk={onAddCard}
          onCancel={() => setCardToAdd(null)}
          okText="Add"
          title={boldText(`Add <b>${cardToAdd.name}</b> to your deck?`)}
        />
      )}
      <OneTimeInfoBox
        showIcon
        id="deck.wants.drag"
        description="Drag and drop cards to add them to your Deck or other Wants Lists"
      />
      <CardGrid
        dragProps={{
          canDrag: true,
          onSuccessfullDrop: onDeleteFromList,
          listId: wantsList.id,
        }}
        hidePagination
        cards={cards}
        cardsPerRow={2}
        cardWidth={200}
        onEnter={onEnter}
        markAsDisabled={alreadyInDeck}
        blockShortcuts={blockShortcuts}
      />
      {/* <DropzoneProps> */}
    </>
  );
};
