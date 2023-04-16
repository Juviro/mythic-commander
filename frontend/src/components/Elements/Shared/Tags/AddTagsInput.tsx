import React, { useState } from 'react';
import { Empty, Select } from 'antd';

import getDropdownAlign from 'utils/getDropdownAlign';
import DEFAULT_TAGS from 'constants/tags';
import Tag from './Tag';

const tagRender = ({ value, onClose }) => {
  return (
    <Tag
      tag={value}
      key={value}
      onDeleteTag={onClose ? (_, event) => onClose(event) : undefined}
    />
  );
};

interface Props {
  onSave?: (tags: string[]) => void;
  onClose?: () => void;
  initialTags?: string[];
  options?: string[];
  alignTop?: boolean;
  defaultOpen?: boolean;
  autoFocus?: boolean;
  allowCustomTags?: boolean;
  placeholder?: string;
  onChange?: (newTags: string[]) => void;
  value?: string[];
}

const AddTagsInput = ({
  onSave,
  onClose,
  initialTags,
  alignTop,
  options = DEFAULT_TAGS,
  defaultOpen,
  autoFocus,
  allowCustomTags,
  placeholder,
  onChange: passedOnChange,
  value,
}: Props) => {
  const [currentTags, setCurrentTags] = useState(initialTags ?? []);
  const [isOpen, setIsOpen] = useState(true);

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (isOpen) return;
    event.stopPropagation();
    if (event.key === 'Enter') {
      onSave?.(currentTags);
    } else if (event.key === 'Escape') {
      onClose?.();
    }
  };

  const onChange = (newTags: string[]) => {
    setCurrentTags(newTags);
    if (passedOnChange) {
      passedOnChange(newTags);
    }
  };

  return (
    <Select
      mode={allowCustomTags ? 'tags' : 'multiple'}
      allowClear={!allowCustomTags}
      autoFocus={autoFocus}
      defaultOpen={defaultOpen}
      style={{ width: '100%' }}
      placeholder={placeholder}
      onDropdownVisibleChange={setIsOpen}
      value={value ?? currentTags}
      optionLabelProp="label"
      tagRender={tagRender}
      onMouseDown={(e) => e.stopPropagation()}
      dropdownAlign={getDropdownAlign(alignTop)}
      onChange={onChange}
      onKeyDown={onKeyDown}
      notFoundContent={
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description="No Tags found"
          style={{ margin: '8px 0' }}
        />
      }
    >
      {options.map((tag) => (
        <Select.Option value={tag} key={tag} label={tag}>
          <Tag tag={tag} key={tag} />
        </Select.Option>
      ))}
    </Select>
  );
};

export default AddTagsInput;
