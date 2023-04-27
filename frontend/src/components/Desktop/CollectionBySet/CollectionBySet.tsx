import React from 'react';
import { useQuery } from '@apollo/client';

import PageLayout from '../../Elements/Desktop/PageLayout/PageLayout';
import { PageCard } from '../../Elements/Desktop/PageLayout';
import { Query } from '../../../types/graphql';
import { collectionBySet } from './queries';
import CBSOverview from './CBSOverview';

// TODO: IDEAS

// Always group. Allow grouping by
// - Type (masters, core etc) - default
// - Release Year

// Allow sorting by
// - release date
// - # of Cards
// - Completion %

// Menu Point: Submenu of Collection

// allow clicking set name to go to advanced search

const CollectionBySet = () => {
  const { data, loading } = useQuery<Query>(collectionBySet);

  if (loading) {
    return <div>TODO: beautiful loading placeholders</div>;
  }

  return (
    <PageLayout>
      <PageCard title="Set Completion">
        <CBSOverview sets={data.collectionBySet} />
      </PageCard>
    </PageLayout>
  );
};

export default CollectionBySet;
