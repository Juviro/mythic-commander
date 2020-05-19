import React from 'react';

import { Checkbox } from 'antd';

export default ({ onChange: onSubmit, isOwned }) => {
  const onChange = e => {
    const newValue = e.target.checked || undefined;

    onSubmit(newValue);
  };

  return (
    <Checkbox
      onChange={onChange}
      checked={isOwned}
      style={{ width: 'fit-content' }}
    >
      Owned cards only
    </Checkbox>
  );
};
