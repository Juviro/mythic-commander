import React from 'react';
import { Typography, message } from 'antd';
import { useMutation } from 'react-apollo';
import styled from 'styled-components';
import { editDeck } from './queries';

const StyledTitleWrapper = styled.div`
  margin-bottom: 0 !important;
  font-weight: 600;
  display: flex;
  margin-right: 20px;
  justify-content: space-between;
  align-items: center;
  height: 50px;
`;

export default ({ deck }) => {
  const [editDeckMutation] = useMutation(editDeck);

  const onChangeName = async name => {
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

  return (
    <StyledTitleWrapper>
      <Typography.Title
        ellipsis
        level={3}
        editable={{ onChange: val => onChangeName(val || 'My Deck') }}
      >
        {deck.name}
      </Typography.Title>
    </StyledTitleWrapper>
  );
};
