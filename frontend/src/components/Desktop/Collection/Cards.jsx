import React from 'react';
import { useMutation } from 'react-apollo';

import message from '../../../utils/message';
import { deleteAllFromCollection } from './queries';
import PaginatedCardList, {
  WithActions,
} from '../../Elements/Desktop/PaginatedCardList/index';
import { CollectionHoc } from '../../Elements/Shared';

export default ({ isSidebarVisible, username }) => {
  const [mutate] = useMutation(deleteAllFromCollection);
  const widthOffset = isSidebarVisible ? 300 : 0;

  const deleteByOracle = (selectedCardIds, numberOfCards) => {
    const oracleIds = selectedCardIds;
    const numberOfCardsLabel =
      numberOfCards > 1 ? `<b>${numberOfCards}</b> cards` : '';

    message(`Deleted ${numberOfCardsLabel} from your collection!`);
    mutate({
      variables: { oracleIds },
      refetchQueries: [
        'currentSnapshots',
        'paginatedCollection',
        'ownedCardNames',
      ],
    });
  };

  const title = username && `${username}'s collection`;

  return (
    <CollectionHoc username={username}>
      {({ loading, cards, numberOfCards, search, setSearch }) => (
        <WithActions
          deleteByOracle={!username && deleteByOracle}
          setSearch={setSearch}
          search={search}
        >
          {actionProps => (
            <PaginatedCardList
              {...actionProps}
              title={title}
              showCollectionFilters
              loading={loading}
              hiddenColumns={['owned']}
              cards={cards}
              widthOffset={widthOffset}
              numberOfCards={numberOfCards}
            />
          )}
        </WithActions>
      )}
    </CollectionHoc>
  );
};
