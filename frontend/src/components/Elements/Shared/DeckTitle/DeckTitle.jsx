import React from 'react';
import { Typography, message } from 'antd';
import { useMutation } from '@apollo/client';
import styled from 'styled-components';
import { editDeck } from './queries';

const StyledTitleWrapper = styled.div`
  font-weight: 600;
  display: flex;
  margin-left: 16px;
  justify-content: space-between;
  align-items: center;
`;

export default ({ deck }) => {
  const [editDeckMutation] = useMutation(editDeck);

  const onChangeName = async (name) => {
    message.success('Deck name changed!');
    editDeckMutation({
      variables: {
        deckId: deck.id,
        newProperties: {
          name,
        },
      },
      optimisticResponse: () => ({
        __typename: 'Mutation',
        editDeck: {
          __typename: 'Deck',
          id: deck.id,
          imgSrc: deck.imgSrc,
          lastEdit: Date.now(),
          name,
        },
      }),
    });
  };

  const editable = deck.canEdit
    ? {
        onChange: (val) => onChangeName(val || 'My Deck'),
      }
    : undefined;

  return (
    <StyledTitleWrapper>
      <Typography.Title
        ellipsis
        level={3}
        style={{ margin: 0, display: 'flex', minWidth: 200 }}
        editable={editable}
      >
        {deck.name}
      </Typography.Title>
    </StyledTitleWrapper>
  );
};
