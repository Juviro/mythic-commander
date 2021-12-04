import styled from 'styled-components';
import { useMutation } from 'react-apollo';
import { Space, Select, Typography } from 'antd';
import React, { useState } from 'react';

import DEFAULT_TAGS from 'constants/tags';
import { UnifiedDeckCard } from 'types/unifiedTypes';
import { MutationSetDefaultTagsArgs } from 'types/graphql';
import AddTagFooter from 'components/Elements/Shared/CardGrid/Tags/AddTagFooter';
import getDropdownAlign from 'utils/getDropdownAlign';
import { CloseOutlined } from '@ant-design/icons';
import { Tag } from './Tag';
import { setDefaultTags } from './queries';
import Flex from '../../Flex';

const StyledMenu = styled.div`
  display: flex;
  flex-direction: column;
  width: 250px;

  & .ant-select-selector {
    padding: 4px;
  }
`;

interface Props {
  onSetTags: (cardId: string, tags: string[]) => void;
  card: UnifiedDeckCard;
  allTags: string[];
  onClose: () => void;
}

const tagRender = ({ value, onClose }) => {
  return <Tag tag={value} key={value} onDeleteTag={(_, event) => onClose(event)} />;
};

export const AddTag = ({ onSetTags, card, allTags, onClose }: Props) => {
  const [currentTags, setCurrentTags] = useState(card.tags ?? []);
  const [isOpen, setIsOpen] = useState(true);
  const [mutate] = useMutation<null, MutationSetDefaultTagsArgs>(setDefaultTags);

  const existingTags = [...new Set(allTags.concat(DEFAULT_TAGS))];

  const onSave = () => {
    onSetTags(card.id, currentTags);
    onClose();
  };

  const onSaveAsDefault = () => {
    const newDefaultTags = currentTags.filter((tag) => DEFAULT_TAGS.includes(tag));
    mutate({ variables: { tags: newDefaultTags, oracleId: card.oracle_id } });
    onSave();
  };

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (isOpen) return;
    event.stopPropagation();
    if (event.key === 'Enter') {
      onSave();
    } else if (event.key === 'Escape') {
      onClose();
    }
  };

  return (
    <StyledMenu>
      <Space direction="vertical" size={12}>
        <Flex justify="space-between">
          <Typography.Text>Add Tag</Typography.Text>
          <CloseOutlined onClick={onClose} />
        </Flex>
        <Select
          mode="tags"
          autoFocus
          defaultOpen
          style={{ width: '100%' }}
          placeholder="Add a tag..."
          onDropdownVisibleChange={setIsOpen}
          value={currentTags}
          defaultValue={card.tags}
          optionLabelProp="label"
          tagRender={tagRender}
          onMouseDown={(e) => e.stopPropagation()}
          dropdownAlign={getDropdownAlign(true)}
          onChange={(value) => setCurrentTags(value)}
          onKeyDown={onKeyDown}
        >
          {existingTags.map((tag) => (
            <Select.Option value={tag} key={tag} label={tag}>
              <Tag tag={tag} key={tag} />
            </Select.Option>
          ))}
        </Select>
        <AddTagFooter onSaveAsDefault={onSaveAsDefault} onSave={onSave} />
      </Space>
    </StyledMenu>
  );
};
