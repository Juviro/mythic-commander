import React from 'react';

import { Checkbox } from 'antd';

export default ({ onChange: onSubmit, isOwned }) => {
  const onChange = e => {
    const newValue = e.target.checked || undefined;

    onSubmit(newValue);
  };

  return (
    <Checkbox onChange={onChange} checked={isOwned} style={{ marginLeft: 0 }}>
      Owned cards only
    </Checkbox>
  );
};
