import React from 'react';
import { useMutation } from 'react-apollo';

import { useParams } from 'react-router';
import { PageCard } from 'components/Elements/Desktop';
import message from '../../../utils/message';
import { deleteAllFromCollection } from './queries';
import PaginatedCardList, {
  WithActions,
} from '../../Elements/Desktop/PaginatedCardList/index';
import { CollectionHoc, FindWantedCards } from '../../Elements/Shared';

export default () => {
  const { username } = useParams();
  const [mutate] = useMutation(deleteAllFromCollection);

  const deleteByOracle = (selectedCardIds, numberOfCards) => {
    const oracleIds = selectedCardIds;
    const numberOfCardsLabel = numberOfCards > 1 ? `<b>${numberOfCards}</b> cards` : '';

    message(`Deleted ${numberOfCardsLabel} from your collection!`);
    mutate({
      variables: { oracleIds },
      refetchQueries: ['currentSnapshots', 'paginatedCollection', 'ownedCardNames'],
    });
  };

  const title = username ? `${username}'s Collection` : 'Your Cards';
  const findCardsButton = username && <FindWantedCards />;

  return (
    <PageCard title={title} style={{ height: 'auto' }} extra={findCardsButton}>
      <CollectionHoc username={username}>
        {({ loading, cards, numberOfCards, search, setSearch }) => (
          <WithActions
            deleteByOracle={!username && deleteByOracle}
            setSearch={setSearch}
            search={search}
          >
            {(actionProps) => (
              <PaginatedCardList
                {...actionProps}
                showCollectionFilters
                loading={loading}
                hiddenColumns={username ? null : ['owned']}
                cards={cards}
                showAddedBeforeFilter
                numberOfCards={numberOfCards}
              />
            )}
          </WithActions>
        )}
      </CollectionHoc>
    </PageCard>
  );
};
