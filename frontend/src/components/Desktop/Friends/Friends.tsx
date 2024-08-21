import React from 'react';

import PageLayout, { PageCard } from 'components/Elements/Desktop/PageLayout';
import FriendsList from 'components/Elements/Shared/FriendsList/FriendsList';

const Friends = () => {
  return (
    <PageLayout>
      <PageCard title="Your Friends">
        <FriendsList />
      </PageCard>
    </PageLayout>
  );
};

export default Friends;
