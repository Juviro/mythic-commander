import { Select } from 'antd';
import { DefaultOptionType } from 'antd/es/select';
import React, { useRef, useState } from 'react';

interface Props {
  options: DefaultOptionType[];
  onSelect: (value: string) => void;
}

const SubmittableSelect = ({ options, onSelect }: Props) => {
  const selectRef = useRef<any>(null);
  const [currentValue, setCurrentValue] = useState('');

  const onKeyDown = (event: any) => {
    event.stopPropagation();
    if (event.key.match(/^.{1}$/)) {
      const newValue = event.target.value + event.key;
      setCurrentValue(newValue);
    } else if (event.key === 'Backspace') {
      const newValue = event.target.value.slice(0, -1);
      setCurrentValue(newValue);
    }
  };

  const optionsWithCurrentValue = options.concat({
    label: currentValue,
    value: currentValue,
  });

  return (
    <Select
      autoFocus
      ref={selectRef}
      placeholder="More..."
      options={optionsWithCurrentValue}
      showSearch
      style={{ minWidth: 150 }}
      onSelect={(value) => {
        onSelect(value);
      }}
      onClick={(e) => e.stopPropagation()}
      onKeyDown={onKeyDown}
    />
  );
};

export default SubmittableSelect;
