import React from 'react';

import { Checkbox } from 'antd';

export default ({ onChangeOption, isLegendary }) => {
  const displayLegendary = (shouldDisplay) => (e) => {
    const isChecked = e.target.checked;
    const newValue = isChecked ? shouldDisplay : '';

    onChangeOption('isLegendary')(newValue);
  };

  return (
    <>
      <Checkbox
        onChange={displayLegendary('true')}
        checked={isLegendary === 'true'}
        style={{ marginRight: 16 }}
      >
        Legendary only
      </Checkbox>
      <Checkbox
        style={{ marginLeft: 0 }}
        onChange={displayLegendary('false')}
        checked={isLegendary === 'false'}
      >
        Non-legendary only
      </Checkbox>
    </>
  );
};
