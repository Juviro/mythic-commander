import { Select, SelectProps } from 'antd';
import React, { useState } from 'react';

type Props = {
  value?: string[];
  initialValue?: string[];
  renderOptions: () => React.ReactNode;
  onSubmit?: (value: string[]) => void;
  onClose: () => void;
  onChange: (newValues: string[]) => void;
} & SelectProps;

const SubmittableSelect = ({
  value,
  initialValue,
  renderOptions,
  onClose,
  onSubmit,
  onChange: passedOnChange,
  ...selectProps
}: Props) => {
  const [currentValue, setCurrentValue] = useState(initialValue ?? []);
  const [isOpen, setIsOpen] = useState(false);

  const selectRef = React.useRef(null);

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (!isOpen && event.key === 'Enter') {
      selectRef.current?.blur();
      onSubmit?.(currentValue);
      return;
    }
    if (event.key === 'Backspace') {
      return;
    }
    if (event.key === 'Escape') {
      if (isOpen) {
        setIsOpen(false);
      } else {
        onClose?.();
      }
      return;
    }

    setIsOpen(true);
  };

  const onChange = (newValues: string[]) => {
    setCurrentValue(newValues);
    passedOnChange?.(newValues);
  };

  return (
    <Select
      {...selectProps}
      open={isOpen}
      ref={selectRef}
      onFocus={() => setIsOpen(true)}
      onClick={() => setIsOpen(true)}
      onBlur={() => setIsOpen(false)}
      value={value ?? currentValue}
      onMouseDown={(e) => e.stopPropagation()}
      onChange={onChange}
      onKeyDown={onKeyDown}
    >
      {renderOptions()}
    </Select>
  );
};

export default SubmittableSelect;
