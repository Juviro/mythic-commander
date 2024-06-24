import React from 'react';

import { PageCard } from '../../../Elements/Desktop/PageLayout';
import { GroupProperty } from '../useGroupSets';
import CBSOptionsFilter from './CBSOptionsFilter';
import CBSOptionsHeader from './CBSOptionsHeader';

export interface Props {
  groupBy: GroupProperty;
  setGroupBy: (value: GroupProperty) => void;
  displayedSetTypes: string[];
  setDisplayedSetTypes: (value: string[]) => void;
  setSearch: (value: string) => void;
}

const CBSOptions = ({
  groupBy,
  setGroupBy,
  displayedSetTypes,
  setDisplayedSetTypes,
  setSearch,
}: Props) => {
  return (
    <PageCard
      title="Set Completion"
      extra={<CBSOptionsHeader groupBy={groupBy} setGroupBy={setGroupBy} />}
      styles={{
        body: {
          padding: 0,
        },
      }}
    >
      <CBSOptionsFilter
        displayedSetTypes={displayedSetTypes}
        setDisplayedSetTypes={setDisplayedSetTypes}
        setSearch={setSearch}
      />
    </PageCard>
  );
};

export default CBSOptions;
