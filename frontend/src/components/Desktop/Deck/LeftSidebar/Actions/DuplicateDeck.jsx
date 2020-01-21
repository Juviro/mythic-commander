import React from 'react';
import { Button } from 'antd';
import { useParams, withRouter } from 'react-router';
import { useMutation } from 'react-apollo';

import { duplicateDeck } from '../../../../../queries';

const DeleteDeck = ({ history }) => {
  const { id: deckId } = useParams();
  const [duplicateDeckMutation] = useMutation(duplicateDeck);

  const onDuplicateDeck = async () => {
    const {
      data: { duplicateDeck: id },
    } = await duplicateDeckMutation({
      variables: {
        deckId,
      },
    });
    history.push(`/deck/${id}`);
  };

  return (
    <Button style={{ marginBottom: 15 }} onClick={onDuplicateDeck}>
      Duplicate Deck
    </Button>
  );
};

export default withRouter(DeleteDeck);
