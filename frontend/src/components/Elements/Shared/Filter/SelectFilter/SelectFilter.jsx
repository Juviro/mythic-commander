import React, { useState, useEffect } from 'react';

import { AutoComplete } from 'antd';
import CustomSkeleton from '../../CustomSkeleton';
import isMobile from '../../../../../utils/isMobile';
import keyCodes from '../../../../../constants/keyCodes';
import { useToggle } from '../../../../Hooks';
import { filterAndSortByQuery } from '../../../../../utils/cardFilter';

const SelectFilter = ({
  onChange,
  options,
  placeholder,
  value = '',
  onSearch,
  allowClear,
  getPrefix,
}) => {
  const inputRef = React.useRef(null);
  const unifiedOptions = options.map((option) => {
    if (option.value) return option;
    return {
      value: option,
      name: option,
    };
  });
  const [currentValue, setCurrentValue] = useState('');
  const [isDropdownVisible, toggleIsVisible] = useToggle(false);

  useEffect(() => {
    const newValue = unifiedOptions.find(
      ({ value: optionValue }) => value === optionValue
    );
    if (!newValue) return;
    setCurrentValue(newValue.name);
    // eslint-disable-next-line
  }, [value]);

  const filteredOptions = filterAndSortByQuery(unifiedOptions, currentValue).map(
    ({ name, value: optionValue }) => (
      <AutoComplete.Option value={optionValue} key={optionValue}>
        {getPrefix && getPrefix(optionValue)}
        {name}
      </AutoComplete.Option>
    )
  );

  const onChangeInput = (inputValue = '') => {
    if (!inputValue) onChange('');
    setCurrentValue(inputValue);
    const isValidOption = unifiedOptions.find(
      ({ name }) => name.toLowerCase() === inputValue.toLowerCase()
    );
    if (isValidOption) {
      onChange(isValidOption.value);
    }
  };

  const onSelect = (_, { key, value: selectedValue }) => {
    onChange(key);
    const currentOptionValue = options.find((option) => option.value === selectedValue);
    if (currentOptionValue) {
      setCurrentValue(currentOptionValue.name);
    }
    if (isMobile()) {
      setTimeout(() => inputRef.current.blur(), 100);
    }
  };

  // reset current input when parent is reset
  useEffect(() => {
    if (value) return;
    setCurrentValue('');
  }, [value]);

  const searchOnEnter = (e) => {
    if (e.keyCode === keyCodes.ENTER && !isDropdownVisible && onSearch) {
      onSearch();
      setTimeout(() => inputRef.current.blur(), 100);
    }
  };

  return (
    <AutoComplete
      size="small"
      value={currentValue}
      ref={inputRef}
      allowClear={allowClear}
      style={{ width: '100%' }}
      placeholder={placeholder}
      onSelect={onSelect}
      onKeyDown={searchOnEnter}
      onChange={onChangeInput}
      defaultActiveFirstOption
      dropdownStyle={{ minWidth: 250 }}
      onDropdownVisibleChange={toggleIsVisible}
    >
      {filteredOptions}
    </AutoComplete>
  );
};

// Wrap around loader so default value is set correctly
// even if options are not loaded from provider yet
export default ({ options, ...rest }) => {
  if (!options.length) return <CustomSkeleton.Line />;

  return <SelectFilter options={options} {...rest} />;
};
