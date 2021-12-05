import React, { useState } from 'react';
import { Select } from 'antd';
import getDropdownAlign from 'utils/getDropdownAlign';
import Tag from './Tag';

const tagRender = ({ value, onClose }) => {
  return <Tag tag={value} key={value} onDeleteTag={(_, event) => onClose(event)} />;
};

interface Props {
  onSave: (tags: string[]) => void;
  onClose: () => void;
  initialTags?: string[];
  options: string[];
  alignTop?: boolean;
  onChange?: (newTags: string[]) => void;
  value?: string[];
}

const AddTagsInput = ({
  onSave,
  onClose,
  initialTags,
  alignTop,
  options,
  onChange: passedOnChange,
  value,
}: Props) => {
  const [currentTags, setCurrentTags] = useState(initialTags ?? []);
  const [isOpen, setIsOpen] = useState(true);

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (isOpen) return;
    event.stopPropagation();
    if (event.key === 'Enter') {
      onSave(currentTags);
    } else if (event.key === 'Escape') {
      onClose();
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
      mode="tags"
      autoFocus
      defaultOpen
      style={{ width: '100%' }}
      placeholder="Add a tag..."
      onDropdownVisibleChange={setIsOpen}
      value={value ?? currentTags}
      optionLabelProp="label"
      tagRender={tagRender}
      onMouseDown={(e) => e.stopPropagation()}
      dropdownAlign={getDropdownAlign(alignTop)}
      onChange={onChange}
      onKeyDown={onKeyDown}
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
