import React from 'react';

import { useParams } from 'react-router';
import Flex from '../Flex';
import ExportAsText from '../ExportAsText';
import AddToWants from '../IncludedWants/AddToWants';

export default ({ cards }) => {
  const { username } = useParams();

  const newListName = `Wants from ${username}`;

  return (
    <Flex justify="flex-end">
      <ExportAsText title="Export Cards" cards={cards} hideAmount />
      <AddToWants
        cardIds={cards.map(({ id }) => id)}
        title="Add all Cards to Wants..."
        newListName={newListName}
      />
    </Flex>
  );
};
