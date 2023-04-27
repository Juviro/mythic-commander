import React from 'react';
import { Collapse } from 'antd';
import { Set } from '../../../types/graphql';
import CBSGroup from './CBSGroup';
import useGroupSets from './useGroupSets';

interface Props {
  sets: Set[];
}

const CBSOverview = ({ sets }: Props) => {
  const { groupedSets } = useGroupSets(sets);

  return (
    <Collapse ghost defaultActiveKey={groupedSets[0].key}>
      {groupedSets.map((groupedSet) => (
        <Collapse.Panel header={groupedSet.key} key={groupedSet.key}>
          <CBSGroup sets={groupedSet.sets} />
        </Collapse.Panel>
      ))}
    </Collapse>
  );
};

export default CBSOverview;
