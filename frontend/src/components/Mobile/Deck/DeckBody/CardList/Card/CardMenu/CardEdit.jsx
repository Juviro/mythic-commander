import React from 'react';
import { Icon } from 'antd';
import { useMutation } from 'react-apollo';
import { useParams } from 'react-router';

import styled, { keyframes } from 'styled-components';
import SetPicker from './SetPicker';
import { editDeckCard, deleteFromDeck } from '../../../../../../../queries';
import AmountPicker from './AmountPicker';

const blendIn = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`;

const StyledWrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  animation: ${blendIn} 0.5s linear;
`;

const StyledItem = styled.div`
  color: inherit;
`;

const StyledLabel = styled.span`
  display: flex;
  color: #313030;
  font-size: 14px;
  font-weight: 600;
  line-height: 30px;
  margin-bottom: -10px;
`;
const StyledActionWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const StyledAction = ({ icon, label }) => (
  <StyledActionWrapper>
    <Icon type={icon} style={{ marginRight: 4 }} />
    {label}
  </StyledActionWrapper>
);

export default ({ card }) => {
  // TODO: add option to change amount.
  // Maybe for now just for basics. Maybe search text for info?
  const { owned } = card;
  const { id: deckId } = useParams();
  const [onDeleteMutation] = useMutation(deleteFromDeck);
  const [editMutation] = useMutation(editDeckCard);

  const onToggleOwned = () => {
    editMutation({
      variables: {
        deckId,
        cardOracleId: card.oracle_id,
        newProps: { owned: !owned },
      },
    });
  };
  const onDelete = () => {
    onDeleteMutation({ variables: { cardId: card.id, deckId } });
  };

  return (
    <StyledWrapper>
      <StyledItem onClick={onToggleOwned}>
        <StyledLabel>Set</StyledLabel>
        <SetPicker card={card} />
      </StyledItem>
      <StyledItem>
        <StyledLabel>Amount</StyledLabel>
        <AmountPicker card={card} />
      </StyledItem>
      <StyledItem>
        <StyledLabel>Collection</StyledLabel>
        <StyledAction
          icon={owned ? 'minus' : 'plus'}
          label={owned ? 'Remove from collection' : 'Add to collection'}
        />
      </StyledItem>
      <StyledItem onClick={onDelete}>
        <StyledLabel>Delete</StyledLabel>
        <StyledAction icon="delete" label="Remove from deck" />
      </StyledItem>
    </StyledWrapper>
  );
};