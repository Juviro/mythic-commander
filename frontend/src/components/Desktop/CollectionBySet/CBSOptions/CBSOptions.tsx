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
}

const CBSOptions = ({
  groupBy,
  setGroupBy,
  displayedSetTypes,
  setDisplayedSetTypes,
}: Props) => {
  return (
    <PageCard
      title="Set Completion"
      extra={<CBSOptionsHeader groupBy={groupBy} setGroupBy={setGroupBy} />}
      bodyStyle={{ padding: 0 }}
    >
      <CBSOptionsFilter
        displayedSetTypes={displayedSetTypes}
        setDisplayedSetTypes={setDisplayedSetTypes}
      />
    </PageCard>
  );
};

export default CBSOptions;
