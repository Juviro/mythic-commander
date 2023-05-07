import React from 'react';
import { Typography } from 'antd';
import styled from 'styled-components';
import { Set } from '../../../types/graphql';
import CBSGroup from './CBSGroup';
import useGroupSets, { GroupProperty } from './useGroupSets';

const StyledTitle = styled(Typography.Title)`
  margin-left: 12px;
`;

interface Props {
  sets: Set[];
  groupBy: GroupProperty;
  displayedSetTypes: string[];
}

const CBSOverview = ({ sets, groupBy, displayedSetTypes }: Props) => {
  const groupedSets = useGroupSets({ sets, groupBy, displayedSetTypes });

  return (
    <>
      {groupedSets.map((groupedSet) => (
        <React.Fragment key={groupedSet.key}>
          <StyledTitle level={4}>{groupedSet.key}</StyledTitle>
          <CBSGroup sets={groupedSet.sets} />
        </React.Fragment>
      ))}
    </>
  );
};

export default CBSOverview;
