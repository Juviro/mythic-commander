import React from 'react';
import styled from 'styled-components';
import { EditOutlined } from '@ant-design/icons';
import { Tag as AntdTag } from 'antd';

import { greyBorder } from 'constants/colors';
import { UnifiedDeckCard } from 'types/unifiedTypes';
import AddTagsPopover from 'components/Elements/Shared/Tags/AddTagsPopover';
import { useMutation } from 'react-apollo';
import { MutationSetDefaultTagsArgs } from 'types/graphql';
import DEFAULT_TAGS from 'constants/tags';
import { setDefaultTags } from './queries';

const StyledAddTag = styled(AntdTag)`
  cursor: pointer;
  background-color: white;
  border: 1px solid ${greyBorder};
  margin-top: 4px;
  border-radius: 12px;
`;

interface Props {
  onSetTags: (cardId: string, tags: string[]) => void;
  card: UnifiedDeckCard;
  allTags: string[];
}

export const AddTagButton = ({ onSetTags, card, allTags }: Props) => {
  const [mutate] = useMutation<null, MutationSetDefaultTagsArgs>(setDefaultTags);
  const onSave = (newTags: string[]) => {
    onSetTags(card.id, newTags);
  };

  const onSaveAsDefault = (newTags: string[]) => {
    onSetTags(card.id, newTags);
    const newDefaultTags = newTags.filter((tag) => DEFAULT_TAGS.includes(tag));
    mutate({ variables: { tags: newDefaultTags, oracleId: card.oracle_id } });
  };

  return (
    <AddTagsPopover
      allTags={allTags}
      onSave={onSave}
      onSaveAsDefault={onSaveAsDefault}
      initialTags={card.tags}
    >
      <StyledAddTag>
        <EditOutlined />
        <span>Edit Tags</span>
      </StyledAddTag>
    </AddTagsPopover>
  );
};
