import React from 'react';

import { Checkbox } from 'antd';
import Flex from 'components/Elements/Shared/Flex';

export default ({ onChange, value, trueLabel, falseLabel }) => {
  const onSelect = (val) => (e) => {
    const isChecked = e.target.checked;
    const newValue = isChecked ? val : '';

    onChange(newValue);
  };

  return (
    <Flex direction="row" wrap="wrap" justify="space-between">
      <Checkbox
        onChange={onSelect('true')}
        checked={value === 'true'}
        style={{ width: 180 }}
      >
        {trueLabel}
      </Checkbox>
      <Checkbox
        style={{ width: 180, marginLeft: 0 }}
        onChange={onSelect('false')}
        checked={value === 'false'}
      >
        {falseLabel}
      </Checkbox>
    </Flex>
  );
};
