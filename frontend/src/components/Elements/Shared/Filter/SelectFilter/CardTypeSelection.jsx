import React, { useContext } from 'react';

import { Checkbox } from 'antd';
import CardContext from '../../../../CardProvider/CardProvider';
import SelectFilter from './SelectFilter';

export default ({ onChangeOption, value, isLegendary }) => {
  const { cardTypes } = useContext(CardContext);

  const displayLegendary = shouldDisplay => e => {
    const isChecked = e.target.checked;
    const newValue = isChecked ? shouldDisplay : '';

    onChangeOption('isLegendary')(newValue);
  };

  return (
    <span>
      <SelectFilter
        value={value}
        onChange={onChangeOption('cardType')}
        options={cardTypes}
        placeholder="Creature, Enchantment, ..."
      />
      <div style={{ marginTop: 8 }}>
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
      </div>
    </span>
  );
};
