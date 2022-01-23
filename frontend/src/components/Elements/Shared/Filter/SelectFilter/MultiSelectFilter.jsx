import React, { useState, useEffect } from 'react';

import { Select, Typography, Tag } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import CustomSkeleton from '../../CustomSkeleton';
import isMobile from '../../../../../utils/isMobile';

const SelectFilter = ({
  onChange,
  options,
  placeholder,
  value = [],
  allowClear,
  getPrefix,
  size = 'default',
}) => {
  const [currentValue, setCurrentValue] = useState(value);
  const onChangeInput = (newValues = []) => {
    setCurrentValue(newValues);
    onChange(newValues);
  };

  // reset current input when parent is reset
  useEffect(() => {
    if (value?.length || !currentValue?.length) return;
    setCurrentValue([]);
    // eslint-disable-next-line
  }, [value]);

  return (
    <Select
      mode="multiple"
      value={currentValue}
      dropdownMatchSelectWidth
      allowClear={allowClear}
      style={{ width: '100%' }}
      onChange={onChangeInput}
      defaultActiveFirstOption
      size={size}
      placeholder={placeholder}
      showSearch
      suffixIcon={<SearchOutlined />}
      filterOption={(input, option) => {
        const normalize = (val) => val.replace(/\s/g, '').toLowerCase();

        return normalize(option.key).includes(normalize(input));
      }}
      tagRender={(props) => {
        const { label, closable, onClose } = props;

        return (
          <Tag
            onMouseDown={(e) => e.stopPropagation()}
            closable={closable}
            onClose={onClose}
            style={{ marginRight: 3 }}
          >
            {label[0]}
            <Typography.Text ellipsis style={{ maxWidth: isMobile() ? 140 : 330 }}>
              {label[1]}
            </Typography.Text>
          </Tag>
        );
      }}
    >
      {options.map((option) => (
        <Select.Option key={option.name} value={option.value}>
          {getPrefix && getPrefix(option.value)}
          {option.name}
        </Select.Option>
      ))}
    </Select>
  );
};

// Wrap around loader so default value is set correctly
// even if options are not loaded from provider yet
export default ({ options, ...rest }) => {
  if (!options.length) return <CustomSkeleton.Line />;

  return <SelectFilter options={options} {...rest} />;
};
