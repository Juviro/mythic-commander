import styled from 'styled-components';
import { Space, Typography } from 'antd';
import React, { useState } from 'react';
import { CloseOutlined } from '@ant-design/icons';

import DEFAULT_TAGS from 'constants/tags';
import AddTagFooter from './AddTagFooter';
import AddTagsInput from './AddTagsInput';
import Flex from '../Flex';

const StyledMenu = styled.div`
  display: flex;
  flex-direction: column;
  width: 250px;

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
        <Flex justify="space-between">
          <Typography.Text>Add Tags</Typography.Text>
          <CloseOutlined onClick={onClose} />
        </Flex>
        <AddTagsInput
          onClose={onClose}
          initialTags={existingTags}
          onSave={onSave}
          options={existingTags}
          onChange={setCurrentTags}
          value={currentTags}
        />
        <AddTagFooter
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
      </Space>
    </StyledMenu>
  );
};

export default AddTagMenu;
