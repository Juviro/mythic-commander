import React, { useContext } from 'react';

import { Checkbox } from 'antd';
import { StringParam, useQueryParams } from 'use-query-params';
import CardContext from '../../../../CardProvider/CardProvider';
import SelectFilter from './SelectFilter';

export default () => {
  const [{ isLegendary }, setFilter] = useQueryParams({
    isLegendary: StringParam,
  });

  const { cardTypes } = useContext(CardContext);

  const displayLegendary = shouldDisplay => e => {
    const isChecked = e.target.checked;

    if (!isChecked) {
      setFilter({ isLegendary: '' });
    } else {
      setFilter({ isLegendary: shouldDisplay });
    }
  };

  return (
    <span>
      <SelectFilter
        options={cardTypes}
        paramName="cardType"
        placeholder="Supertype"
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
