import styled from 'styled-components';
import { PlusOutlined } from '@ant-design/icons';
import { Popover, Tag as AntdTag, Input, Space } from 'antd';
import React, { useEffect, useRef, useState } from 'react';

import { useToggle } from 'components/Hooks';
import { greyBorder } from 'constants/colors';
import DEFAULT_TAGS from 'constants/tags';
import { UnifiedDeckCard } from 'types/unifiedTypes';
import { Tag } from './Tag';
import Flex from '../../Flex';

const StyledAddTag = styled(AntdTag)`
  cursor: pointer;
  background-color: white;
  border: 1px solid ${greyBorder};
  margin-top: 4px;
  border-radius: 12px;
`;

const StyledMenu = styled.div`
  display: flex;
  flex-direction: column;
  width: 250px;
`;

interface Props {
  onSetTags: (cardId: string, tags: string[]) => void;
  card: UnifiedDeckCard;
  allTags: string[];
}

export const AddTag = ({ onSetTags, card, allTags }: Props) => {
  const [visible, toggleVisible] = useToggle();
  const inputRef = useRef(null);
  const [search, setSearch] = useState<string>('');

  const existingTags = [...new Set(allTags.concat(DEFAULT_TAGS))];
  const displayedTags = existingTags.filter(
    (tag) => !card.tags?.includes(tag) && tag.toLowerCase().includes(search.toLowerCase())
  );

  const onAddTag = (tag: string) => {
    toggleVisible(false);
    const currentTags = card.tags ?? [];
    const usedTag =
      existingTags.find((existing) => existing.toLowerCase() === tag.toLowerCase()) ??
      tag;

    const newTags = [...new Set(currentTags.concat(usedTag))];

    onSetTags(card.id, newTags);
    setSearch('');
  };

  const onReset = () => {
    toggleVisible(false);
    setSearch('');
  };

  useEffect(() => {
    if (!visible || !inputRef.current) return;
    inputRef.current.focus();
  }, [visible]);

  const menu = (
    <StyledMenu>
      <Space direction="vertical">
        <Input
          ref={inputRef}
          placeholder="Enter your tag"
          style={{ width: '100%' }}
          onSubmit={() => onAddTag(search)}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(event) => {
            if (event.key !== 'Enter') return;
            onAddTag(search);
            onReset();
          }}
          value={search}
        />
        <Flex wrap="wrap">
          {displayedTags.map((tag) => (
            <Tag tag={tag} key={tag} onClick={() => onAddTag(tag)} />
          ))}
        </Flex>
      </Space>
    </StyledMenu>
  );

  return (
    <Popover
      content={menu}
      placement="bottomLeft"
      trigger={['click']}
      visible={visible}
      onVisibleChange={toggleVisible}
    >
      <StyledAddTag>
        <PlusOutlined />
        <span>Add Tag</span>
      </StyledAddTag>
    </Popover>
  );
};
