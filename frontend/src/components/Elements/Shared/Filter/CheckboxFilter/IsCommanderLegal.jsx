import React from 'react';

import { Checkbox } from 'antd';
import { BooleanParam, useQueryParam } from 'use-query-params';

export default () => {
  const [isCommanderLegal, setChecked] = useQueryParam(
    'isCommanderLegal',
    BooleanParam
  );

  const onChange = e => {
    setChecked(e.target.checked || undefined);
  };

  return (
    <Checkbox onChange={onChange} checked={isCommanderLegal}>
      Commander legal cards only
    </Checkbox>
  );
};
