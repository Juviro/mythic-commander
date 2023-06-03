import { Checkbox, Collapse, Typography } from 'antd';
import Flex from 'components/Elements/Shared/Flex';
import React from 'react';
import styled from 'styled-components';
import { SET_GROUPS } from '../useGroupSets';

export const INITIAL_DISPLAYD_SET_TYPES = SET_GROUPS.map(({ key }) => key);

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

interface Props {
  displayedSetTypes;
  setDisplayedSetTypes;
}

const CBSOptionsFilter = ({ displayedSetTypes, setDisplayedSetTypes }: Props) => {
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
