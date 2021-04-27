import React from 'react';
import { useMutation } from 'react-apollo';

import MultiInput from 'components/Elements/Desktop/AddCards/MultIinput';
import message from '../../../utils/message';
import { AddCards, PageCard } from '../../Elements/Desktop';
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
