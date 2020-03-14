import React from 'react';
import { message } from 'antd';
import { useParams } from 'react-router';
import { useMutation } from 'react-apollo';
import styled from 'styled-components';
import { DeleteOutlined } from '@ant-design/icons';
import { deleteFromDeck } from '../../../../../../../queries';

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

export default ({ card }) => {
  const { id: deckId } = useParams();
  const [onDeleteMutation] = useMutation(deleteFromDeck);

  const onDelete = () => {
    message.success(
      <span>
        Deleted <b>{card.name}</b> from your deck!
      </span>
    );
    onDeleteMutation({ variables: { cardId: card.id, deckId } });
  };

  return (
    <StyledActionWrapper onClick={onDelete}>
      <DeleteOutlined style={{ marginRight: 4, fontSize: 14 }} theme="filled" />
      <span>Remove</span>
    </StyledActionWrapper>
  );
};
