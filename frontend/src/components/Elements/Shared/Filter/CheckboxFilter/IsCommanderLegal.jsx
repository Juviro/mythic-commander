import React from 'react';

import { Checkbox } from 'antd';

export default ({ onChange: onSubmit, isCommanderLegal }) => {
  const onChange = e => {
    const newValue = e.target.checked || undefined;

    onSubmit(newValue);
  };

  return (
    <Checkbox
      onChange={onChange}
      checked={isCommanderLegal}
      style={{ width: 'fit-content' }}
    >
      Commander legal
    </Checkbox>
  );
};
