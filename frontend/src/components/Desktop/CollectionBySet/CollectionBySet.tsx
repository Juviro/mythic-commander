import React, { useState } from 'react';
import { useQuery } from '@apollo/client';

import PageLayout from '../../Elements/Desktop/PageLayout/PageLayout';
import { PageCard } from '../../Elements/Desktop/PageLayout';
import { Query } from '../../../types/graphql';
import { collectionBySet } from './queries';
import CBSOverview from './CBSOverview';
import useLocalStorage from '../../Hooks/useLocalStorage';
import CBSOptions, { INITIAL_DISPLAYD_SET_TYPES } from './CBSOptions';

// TODO: IDEAS

// Always group. Allow grouping by
// - Type (masters, core etc) - default
// - Release Year

// Allow sorting by
// - release date
// - # of Cards
// - Completion %

// Menu Point: Submenu of Collection

// grey out unreleased sets

const CollectionBySet = () => {
  const { data, loading } = useQuery<Query>(collectionBySet);
  const [groupBy, setGroupBy] = useLocalStorage('group-by', 'type');
  const [displayedSetTypes, setDisplayedSetTypes] = useState(INITIAL_DISPLAYD_SET_TYPES);

  if (loading) {
    return <div>TODO: beautiful loading placeholders</div>;
  }

  return (
    <PageLayout>
      <CBSOptions
        groupBy={groupBy}
        setGroupBy={setGroupBy}
        displayedSetTypes={displayedSetTypes}
        setDisplayedSetTypes={setDisplayedSetTypes}
      />
      <PageCard>
        <CBSOverview
          sets={data.collectionBySet}
          groupBy={groupBy}
          displayedSetTypes={displayedSetTypes}
        />
      </PageCard>
    </PageLayout>
  );
};

export default CollectionBySet;
