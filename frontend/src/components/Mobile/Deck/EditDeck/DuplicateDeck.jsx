import React from 'react';
import { Button } from 'antd';
import { useMutation } from 'react-apollo';
import { useParams, withRouter } from 'react-router';

import { duplicateDeck } from '../../../../queries';
import getDynamicUrl from '../../../../utils/getDynamicUrl';

const DuplicateDeck = ({ history }) => {
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
    history.push(getDynamicUrl(`/decks/${id}`));
  };
  return (
    <Button type="link" onClick={onDuplicateDeck}>
      Duplicate Deck
    </Button>
  );
};

export default withRouter(DuplicateDeck);
