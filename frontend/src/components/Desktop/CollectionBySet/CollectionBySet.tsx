import React, { useState } from 'react';
import { useQuery } from '@apollo/client';

import useDocumentTitle from 'components/Hooks/useDocumentTitle';
import PageLayout from '../../Elements/Desktop/PageLayout/PageLayout';
import { PageCard } from '../../Elements/Desktop/PageLayout';
import { Query } from '../../../types/graphql';
import { collectionBySet } from './queries';
import CBSOverview from './CBSOverview';
import useLocalStorage from '../../Hooks/useLocalStorage';
import CBSOptions from './CBSOptions/CBSOptions';
import Spinner from '../../Elements/Shared/Spinner';
import { INITIAL_DISPLAYD_SET_TYPES } from './CBSOptions/CBSOptionsFilter';

const CollectionBySet = () => {
  const { data, loading } = useQuery<Query>(collectionBySet);
  const [groupBy, setGroupBy] = useLocalStorage('group-by', 'type');
  const [displayedSetTypes, setDisplayedSetTypes] = useState(INITIAL_DISPLAYD_SET_TYPES);
  const [search, setSearch] = useState('');

  useDocumentTitle('Collection by Set');

  return (
    <PageLayout>
      <CBSOptions
        groupBy={groupBy}
        setGroupBy={setGroupBy}
        setSearch={setSearch}
        displayedSetTypes={displayedSetTypes}
        setDisplayedSetTypes={setDisplayedSetTypes}
      />
      <PageCard>
        {loading ? (
          <Spinner />
        ) : (
          <CBSOverview
            sets={data.collectionBySet}
            groupBy={groupBy}
            search={search}
            displayedSetTypes={displayedSetTypes}
          />
        )}
      </PageCard>
    </PageLayout>
  );
};

export default CollectionBySet;
