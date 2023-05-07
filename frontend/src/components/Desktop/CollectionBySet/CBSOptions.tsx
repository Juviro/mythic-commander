import React from 'react';
import { Checkbox, Radio, Typography } from 'antd';

import styled from 'styled-components';
import { PageCard } from '../../Elements/Desktop/PageLayout';
import { GroupProperty, SET_GROUPS } from './useGroupSets';
import Flex from '../../Elements/Shared/Flex';

const StyledLabel = styled(Typography.Text)`
  margin-right: 24px;
  white-space: nowrap;

  &:after {
    content: ':';
  }
`;

const StyledRadioButtons = styled(Radio.Group)`
  display: flex;
  flex-direction: column;
  margin-right: 64px;
`;

const StyledCheckboxes = styled(Checkbox.Group)`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
  width: 100%;
`;

const GROUP_BY_OPTIONS = [
  { label: 'Type', value: 'type' },
  { label: 'Release Year', value: 'year' },
];

const DISPLAYED_SET_TYPES_OPTIONS = SET_GROUPS.map(({ name, key }) => ({
  label: name,
  value: key,
}));

export const INITIAL_DISPLAYD_SET_TYPES = SET_GROUPS.map(({ key }) => key);

interface Props {
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
  const onCheckAllChange = (e: any) => {
    setDisplayedSetTypes(e.target.checked ? INITIAL_DISPLAYD_SET_TYPES : []);
  };
  return (
    <PageCard title="Set Completion">
      <Flex gap={24} wrap="wrap">
        <Flex>
          <StyledLabel strong>Group By</StyledLabel>
          <StyledRadioButtons
            options={GROUP_BY_OPTIONS}
            value={groupBy}
            onChange={(e) => setGroupBy(e.target.value)}
          />
        </Flex>
        <Flex flex={1}>
          <Flex direction="column">
            <StyledLabel strong>Set Types</StyledLabel>
          </Flex>

          <StyledCheckboxes
            options={DISPLAYED_SET_TYPES_OPTIONS}
            value={displayedSetTypes}
            onChange={setDisplayedSetTypes}
          />
        </Flex>
        <Checkbox
          indeterminate={
            displayedSetTypes.length > 0 && displayedSetTypes.length < SET_GROUPS.length
          }
          onChange={onCheckAllChange}
          checked={displayedSetTypes.length === SET_GROUPS.length}
          style={{ whiteSpace: 'nowrap' }}
        >
          Check all
        </Checkbox>
      </Flex>
    </PageCard>
  );
};

export default CBSOptions;
