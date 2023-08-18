import React from 'react';
import { Empty, Select } from 'antd';

import getDropdownAlign from 'utils/getDropdownAlign';
import DEFAULT_TAGS from 'constants/tags';
import SubmittableSelect from 'components/Elements/Desktop/SubmittableSelect/SubmittableSelect';
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
  onChange,
  value,
}: Props) => {
  return (
    <SubmittableSelect
      value={value}
      initialValue={initialTags}
      onClose={onClose}
      onSubmit={onSave}
      mode={allowCustomTags ? 'tags' : 'multiple'}
      allowClear={!allowCustomTags}
      autoFocus={autoFocus}
      defaultOpen={defaultOpen}
      style={{ width: '100%' }}
      placeholder={placeholder}
      tagRender={tagRender}
      onMouseDown={(e) => e.stopPropagation()}
      dropdownAlign={getDropdownAlign(alignTop)}
      onChange={onChange}
      optionLabelProp="label"
      notFoundContent={
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description="No Tags found"
          style={{ margin: '8px 0' }}
        />
      }
      renderOptions={() =>
        options.map((tag) => (
          <Select.Option value={tag} key={tag} label={tag}>
            <Tag tag={tag} key={tag} />
          </Select.Option>
        ))
      }
    />
  );
};

export default AddTagsInput;
