import React from 'react';
import { useMutation } from '@apollo/client';

import MultiInput from 'components/Elements/Desktop/AddCards/MultIinput';
import AddCards from 'components/Elements/Desktop/AddCards';
import { PageCard } from 'components/Elements/Desktop/PageLayout';
import message from '../../../utils/message';
import { addToCollectionDesktop } from './queries';

export default () => {
  const [mutate] = useMutation(addToCollectionDesktop);

  const onAddCards = (cards, name) => {
    const addedName = name || `${cards.length} cards`;
    message(`Added <b>${addedName}</b> to your collection!`);
    mutate({
      variables: { cards },
      refetchQueries: ['currentSnapshots', 'paginatedCollection', 'ownedCardNames'],
    });
  };

  return (
    <PageCard
      title="Add Cards to your Collection"
      extra={<MultiInput onAddCards={onAddCards} />}
    >
      <AddCards onAddCards={onAddCards} autoFocus={false} isAdvanced allowFoilInput />
    </PageCard>
  );
};
