import React from 'react';

import { Checkbox } from 'antd';
import { BooleanParam, useQueryParam } from 'use-query-params';

export default () => {
  const [isOwned, setChecked] = useQueryParam('isOwned', BooleanParam);

  const onChange = e => {
    setChecked(e.target.checked);
  };

  return (
    <Checkbox onChange={onChange} checked={isOwned} style={{ marginLeft: 0 }}>
      Owned cards only
    </Checkbox>
  );
};
