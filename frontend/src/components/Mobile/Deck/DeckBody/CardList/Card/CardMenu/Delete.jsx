import React from 'react';
import { useParams } from 'react-router';
import { useMutation } from 'react-apollo';
import styled from 'styled-components';
import { DeleteOutlined } from '@ant-design/icons';
import message from '../../../../../../../utils/message';
import { deleteFromDeck } from '../../../../queries';

const StyledActionWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 14px;
  color: black;
  position: absolute;
  left: 0;
  bottom: 0;
  cursor: pointer;
`;

export default ({ card, deck }) => {
  const { id: deckId } = useParams();
  const [onDeleteMutation] = useMutation(deleteFromDeck);

  const onDelete = () => {
    message(`Deleted <b>${card.name}</b> from your deck!`);
    const newCards = deck.cards.filter(({ id }) => id !== card.id);
    onDeleteMutation({
      variables: { cardId: card.id, deckId },
      optimisticResponse: () => ({
        __typename: 'Mutation',
        deleteFromDeck: {
          ...deck,
          cards: newCards,
        },
      }),
    });
  };

  return (
    <StyledActionWrapper onClick={onDelete}>
      <DeleteOutlined style={{ marginRight: 4, fontSize: 14 }} theme="filled" />
      <span>Remove</span>
    </StyledActionWrapper>
  );
};
