import styled from 'styled-components';
import { Space } from 'antd';
import React, { useState } from 'react';

import DEFAULT_TAGS from 'constants/tags';
import AddTagFooter from './AddTagFooter';
import AddTagsInput from './AddTagsInput';

const StyledMenu = styled.div`
  display: flex;
  flex-direction: column;

  & .ant-select-selector {
    padding: 4px;
  }
`;

interface Props {
  onSave: (tags: string[]) => void;
  allTags: string[];
  onClose: () => void;
  onSaveAsDefault: (tags: string[]) => void;
  initialTags?: string[];
}

const AddTagMenu = ({
  onSave: passedOnSave,
  allTags,
  onClose,
  onSaveAsDefault,
  initialTags,
}: Props) => {
  const [currentTags, setCurrentTags] = useState(initialTags ?? []);

  const existingTags = [...new Set(allTags.concat(DEFAULT_TAGS))];

  const onSave = () => {
    passedOnSave(currentTags);
    onClose();
  };

  return (
    <StyledMenu>
      <Space direction="vertical" size={12}>
        <AddTagFooter
          onClose={onClose}
          onSaveAsDefault={
            onSaveAsDefault
              ? () => {
                  onSaveAsDefault(currentTags);
                  onClose();
                }
              : undefined
          }
          onSave={onSave}
        />
        <AddTagsInput
          defaultOpen
          autoFocus
          allowCustomTags
          onClose={onClose}
          placeholder="Add a tag..."
          initialTags={existingTags}
          onSave={onSave}
          options={existingTags}
          onChange={setCurrentTags}
          value={currentTags}
        />
      </Space>
    </StyledMenu>
  );
};

export default AddTagMenu;
