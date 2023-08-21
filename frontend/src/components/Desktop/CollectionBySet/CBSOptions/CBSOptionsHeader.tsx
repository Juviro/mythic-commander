import React from 'react';

import { Select } from 'antd';
import { Props as CBSOptionsFilterProps } from './CBSOptions';

const GROUP_BY_OPTIONS = [
  { label: 'Group by Set Type', value: 'type' },
  { label: 'Group by Release Year', value: 'year' },
  { label: 'Group by Completion Tier', value: 'completion' },
];

type Props = Pick<CBSOptionsFilterProps, 'groupBy' | 'setGroupBy'>;

const CBSOptionsHeader = ({ groupBy, setGroupBy }: Props) => {
  return (
    <Select
      defaultValue={groupBy}
      onChange={setGroupBy}
      options={GROUP_BY_OPTIONS}
      style={{ width: 210 }}
    />
  );
};

export default CBSOptionsHeader;
