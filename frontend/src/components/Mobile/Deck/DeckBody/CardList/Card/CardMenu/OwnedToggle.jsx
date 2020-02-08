import React from 'react';
import { Checkbox } from 'antd';
import { useParams } from 'react-router';
import { useMutation } from 'react-apollo';
import { editDeckCard } from '../../../../../../../queries';

export default ({ card }) => {
  const { id: deckId } = useParams();
  const [editMutation] = useMutation(editDeckCard);

  const onChange = event => {
    const owned = event.target.checked;
    editMutation({
      variables: {
        deckId,
        cardOracleId: card.oracle_id,
        newProps: { owned },
      },
      optimisticResponse: () => ({
        __typename: 'Mutation',
        editDeckCard: {
          ...card,
          owned,
        },
      }),
    });
  };

  return (
    <Checkbox
      onChange={onChange}
      defaultChecked={card.owned}
      style={{ fontWeight: 600 }}
    >
      Collected
    </Checkbox>
  );
};
