import React from 'react';

import { PageLayout } from 'components/Elements/Desktop';
import Cards from './Cards';
import CollectionSidebar from './CollectionSidebar';
import useLocalStorage from '../../Hooks/useLocalStorage';

export default () => {
  const [isSidebarVisible, setIsSidebarVisible] = useLocalStorage(
    'isSidebarVisible',
    true
  );
  const toggleIsSidebarVisible = () => setIsSidebarVisible(!isSidebarVisible);

  return (
    <PageLayout>
      <div style={{ position: 'absolute', left: 0 }}>
        <CollectionSidebar
          isVisible={isSidebarVisible}
          toggleIsVisible={toggleIsSidebarVisible}
        />
      </div>
      <Cards isSidebarVisible={isSidebarVisible} />
    </PageLayout>
  );
};
