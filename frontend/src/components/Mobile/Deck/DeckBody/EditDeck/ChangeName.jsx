import React from 'react';
import { List, Typography } from 'antd';
import { useMutation } from 'react-apollo';

import { editDeck } from '../../../../../queries';

export default ({ deck }) => {
  const [editDeckMutation] = useMutation(editDeck);

  const onChangeName = async name => {
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
          ...deck,
          name,
        },
      }),
    });
  };

  return (
    <List.Item style={{ padding: 16 }}>
      <Typography.Paragraph
        ellipsis
        editable={{ onChange: val => onChangeName(val || 'My Deck') }}
        style={{ marginTop: 10, fontSize: 14, width: '100%', display: 'flex', justifyContent: 'space-between' }}
      >
        {deck.name}
      </Typography.Paragraph>
    </List.Item>
  );
};
