import React, { useContext, useState, useEffect } from 'react';

import { AutoComplete, Checkbox } from 'antd';
import { StringParam, useQueryParams } from 'use-query-params';
import CardContext from '../../CardProvider/CardProvider';

export default () => {
  const [{ cardType, isLegendary }, setFilter] = useQueryParams({
    cardType: StringParam,
    isLegendary: StringParam,
  });

  const [value = '', setValue] = useState(cardType);
  const { cardTypes } = useContext(CardContext);

  useEffect(() => {
    if (!cardType) setValue('');
  }, [cardType]);

  const setSelectedType = val => {
    setFilter({ cardType: val });
  };

  const options = cardTypes
    .filter(type => type.toLowerCase().startsWith(value.toLowerCase()))
    .map(type => <AutoComplete.Option key={type}>{type}</AutoComplete.Option>);

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
      <AutoComplete
        size="small"
        value={value}
        allowClear
        defaultActiveFirstOption
        style={{ width: '100%' }}
        placeholder="Search for creature type"
        onChange={val => {
          setValue(val);
          if (!cardTypes.includes(val)) setSelectedType('');
        }}
        onSelect={val => setSelectedType(val)}
      >
        {options}
      </AutoComplete>
      <div style={{ marginTop: 8 }}>
        <Checkbox
          onChange={displayLegendary('true')}
          checked={isLegendary === 'true'}
        >
          Legendary only
        </Checkbox>
        <Checkbox
          onChange={displayLegendary('false')}
          checked={isLegendary === 'false'}
        >
          Non-legendary only
        </Checkbox>
      </div>
    </span>
  );
};
