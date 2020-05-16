import React from 'react';
import { Typography, message } from 'antd';
import { useMutation } from 'react-apollo';
import { editDeck } from './queries';

export default ({ deck, fontSize = 14 }) => {
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
    <Typography.Paragraph
      ellipsis
      editable={{ onChange: val => onChangeName(val || 'My Deck') }}
      style={{
        marginBottom: 0,
        fontSize,
        fontWeight: 600,
        display: 'flex',
        marginRight: 20,
        justifyContent: 'space-between',
      }}
    >
      {deck.name}
    </Typography.Paragraph>
  );
};
