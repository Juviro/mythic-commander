import { Checkbox, Collapse, Input, Typography } from 'antd';
import React from 'react';
import styled from 'styled-components';

import Flex from 'components/Elements/Shared/Flex';
import { SET_GROUPS } from '../useGroupSets';
import { Props as CBSOptionsFilterProps } from './CBSOptions';

export const INITIAL_DISPLAYD_SET_TYPES = SET_GROUPS.map(({ key }) => key);

const StyledSearch = styled(Input.Search)`
  margin-bottom: 24px;
  max-width: 250px;
`;

const StyledLabel = styled(Typography.Text)`
  margin-right: 24px;
  white-space: nowrap;

  &:after {
    content: ':';
  }
`;

const StyledCheckboxes = styled(Checkbox.Group)`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
  width: 100%;
`;

const DISPLAYED_SET_TYPES_OPTIONS = SET_GROUPS.map(({ name, key }) => ({
  label: name,
  value: key,
}));

type Props = Pick<
  CBSOptionsFilterProps,
  'displayedSetTypes' | 'setDisplayedSetTypes' | 'setSearch'
>;

const CBSOptionsFilter = ({
  displayedSetTypes,
  setDisplayedSetTypes,
  setSearch,
}: Props) => {
  const onCheckAllChange = (e: any) => {
    setDisplayedSetTypes(e.target.checked ? INITIAL_DISPLAYD_SET_TYPES : []);
  };

  const isFiltered = displayedSetTypes.length < SET_GROUPS.length;

  let panelHeader = 'Filter Sets';
  if (isFiltered) {
    panelHeader += ` (${displayedSetTypes.length})`;
  }

  return (
    <Collapse ghost style={{ marginBottom: -32 }}>
      <Collapse.Panel key="1" header={panelHeader}>
        <StyledSearch
          placeholder="Search"
          width={20}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Flex gap={24} wrap="wrap">
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
      </Collapse.Panel>
    </Collapse>
  );
};

export default CBSOptionsFilter;
