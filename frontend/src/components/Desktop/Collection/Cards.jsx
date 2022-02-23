import React from 'react';
import { useMutation } from 'react-apollo';

import { useParams } from 'react-router';
import { PageCard } from 'components/Elements/Desktop/PageLayout';
import CollectionHoc from 'components/Elements/Shared/CollectionHoc';
import FindWantedCards from 'components/Elements/Shared/FindWantedCards';
import message from '../../../utils/message';
import { deleteAllFromCollection } from './queries';
import PaginatedCardList from '../../Elements/Desktop/PaginatedCardList';

export default () => {
  const { username } = useParams();
  const [mutate] = useMutation(deleteAllFromCollection);

  const deleteByOracle = (selectedCardIds, numberOfCards) => {
    const oracleIds = selectedCardIds;
    const numberOfCardsLabel = numberOfCards > 1 ? `<b>${numberOfCards}</b> cards ` : '';

    message(`Deleted ${numberOfCardsLabel}from your collection!`);
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
          <PaginatedCardList
            showCollectionFilters
            loading={loading}
            cards={cards}
            showAddedBeforeFilter
            search={search}
            setSearch={setSearch}
            numberOfCards={numberOfCards}
            deleteByOracle={!username && deleteByOracle}
          />
        )}
      </CollectionHoc>
    </PageCard>
  );
};
