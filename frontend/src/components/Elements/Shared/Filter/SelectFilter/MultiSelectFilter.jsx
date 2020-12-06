import React, { useState, useEffect } from 'react';

import { AutoComplete, Input } from 'antd';
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
  size = 'default',
}) => {
  const inputRef = React.useRef(null);
  const [currentValue, setCurrentValue] = useState('');
  const [isDropdownVisible, toggleIsVisible] = useToggle(false);

  const formattedOptions = options.map((option) => ({
    label: option.label,
    options: option.options.map((name) => ({ value: name, name })),
  }));
  const allOptions = formattedOptions
    .map((option) => option.options.map((name) => name))
    .flat();

  useEffect(() => {
    const newValue = allOptions.find(({ value: optionValue }) => value === optionValue);
    if (!newValue) return;
    setCurrentValue(newValue.name);
    // eslint-disable-next-line
  }, [value]);

  const filterOptions = (optionsToFilter) =>
    filterAndSortByQuery(optionsToFilter, currentValue).map(
      ({ name, value: optionValue }) => ({
        label: (
          <span>
            {getPrefix && getPrefix(optionValue)}
            {name}
          </span>
        ),
        value: optionValue,
      })
    );

  const filteredOptions = formattedOptions
    .map(({ options: subOptions, ...rest }) => ({
      ...rest,
      options: filterOptions(subOptions),
    }))
    .filter(({ options: subOptions }) => subOptions.length);

  const onChangeInput = (inputValue = '') => {
    if (!inputValue) onChange('');
    setCurrentValue(inputValue);
    const isValidOption = allOptions.find(
      ({ name }) => name.toLowerCase() === inputValue.toLowerCase()
    );
    if (isValidOption) {
      onChange(isValidOption.value);
    }
  };

  const onSelect = (inputValue) => {
    onChange(inputValue);
    const currentOptionValue = allOptions.find((option) => option.value === inputValue);
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
      value={currentValue}
      ref={inputRef}
      dropdownMatchSelectWidth
      allowClear={allowClear}
      style={{ width: '100%' }}
      onSelect={onSelect}
      onKeyDown={searchOnEnter}
      onChange={onChangeInput}
      defaultActiveFirstOption
      onDropdownVisibleChange={toggleIsVisible}
      options={filteredOptions}
    >
      <Input.Search
        size={size}
        placeholder={placeholder}
        prefix={<span>{getPrefix && value && getPrefix(value)}</span>}
      />
    </AutoComplete>
  );
};

// Wrap around loader so default value is set correctly
// even if options are not loaded from provider yet
export default ({ options, ...rest }) => {
  if (!options.length) return <CustomSkeleton.Line />;

  return <SelectFilter options={options} {...rest} />;
};
