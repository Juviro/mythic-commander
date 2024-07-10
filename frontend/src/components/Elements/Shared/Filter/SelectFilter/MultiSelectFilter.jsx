import React from 'react';

import { Select, Typography, Tag } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import SubmittableSelect from 'components/Elements/Desktop/SubmittableSelect/SubmittableSelect';
import CustomSkeleton from '../../CustomSkeleton';
import isMobile from '../../../../../utils/isMobile';

const getUnifiedOptions = (options, isGrouped) => {
  const unifyOptions = (option) => {
    if (option.value) return option;
    return {
      value: option,
      name: option,
    };
  };

  if (!isGrouped) {
    return options.map(unifyOptions);
  }

  return options.map((option) => {
    return {
      label: option.label,
      options: option.options.map(unifyOptions),
    };
  });
};

const renderOptions = (options, getPrefix, isGrouped) => {
  if (!isGrouped) {
    return options.map((option) => (
      <Select.Option key={option.name} value={option.value}>
        {getPrefix && getPrefix(option.value)}
        {option.name}
      </Select.Option>
    ));
  }

  return options.map((optionGroup) => (
    <Select.OptGroup key={optionGroup.label} label={optionGroup.label}>
      {optionGroup.options.map((option) => (
        <Select.Option key={option.name} value={option.value}>
          {getPrefix && getPrefix(option.value)}
          {option.name}
        </Select.Option>
      ))}
    </Select.OptGroup>
  ));
};

const tagRender = (props) => {
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
};

const MultiSelectFilter = ({
  onChange,
  options,
  placeholder,
  value = [],
  allowClear,
  getPrefix,
  isGrouped,
  onSearch,
  size = 'default',
}) => {
  const unifiedOptions = getUnifiedOptions(options, isGrouped);

  return (
    <SubmittableSelect
      mode="multiple"
      value={value}
      popupMatchSelectWidth
      allowClear={allowClear}
      style={{ width: '100%' }}
      onChange={onChange}
      defaultActiveFirstOption
      size={size}
      placeholder={placeholder}
      showSearch
      onSubmit={onSearch}
      suffixIcon={<SearchOutlined />}
      filterOption={(input, option) => {
        const normalize = (val) => val.replace(/\s/g, '').toLowerCase();

        return normalize(option.key).includes(normalize(input));
      }}
      tagRender={tagRender}
      renderOptions={() => renderOptions(unifiedOptions, getPrefix, isGrouped)}
    />
  );
};

// Wrap around loader so default value is set correctly
// even if options are not loaded from provider yet
export default ({ options, ...rest }) => {
  if (!options?.length) return <CustomSkeleton.Line />;

  return <MultiSelectFilter options={options} {...rest} />;
};
