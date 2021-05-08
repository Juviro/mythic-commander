import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { PlusOutlined } from '@ant-design/icons';
import { AutoComplete, Dropdown, Menu, Tag } from 'antd';

import { useToggle } from 'components/Hooks';
import { greyBorder } from 'constants/colors';
import keyCodes from 'constants/keyCodes';
import DEFAULT_TAGS from 'constants/tags';
import { UnifiedDeckCard } from 'types/unifiedTypes';

const StyledAddTag = styled(Tag)`
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

export const AddTagMenu = ({ onSetTags, card, allTags }: Props) => {
  const [visible, toggleVisible] = useToggle();
  const inputRef = useRef(null);
  const [search, setSearch] = useState<string>('');

  const onAddTag = (tag: string) => {
    toggleVisible(false);
    const currentTags = card.tags ?? [];
    onSetTags(card.id, currentTags.concat(tag));
    setSearch('');
  };

  const onReset = () => {
    toggleVisible(false);
    setSearch(null);
  };

  const displayedOptions = [...new Set(allTags.concat(DEFAULT_TAGS))].filter(
    (tag) => !card.tags?.includes(tag)
  );

  useEffect(() => {
    if (!visible || !inputRef.current) return;
    inputRef.current.focus();
  }, [visible]);

  return (
    <AutoComplete
      autoFocus
      defaultOpen
      ref={inputRef}
      placeholder="Enter your tag"
      onSelect={onAddTag}
      style={{ width: 200 }}
      onChange={setSearch}
      onKeyDown={(event) => {
        if (event.keyCode !== keyCodes.ENTER) return;
        onAddTag(search);
        onReset();
      }}
      value={search}
      onBlur={onReset}
      options={displayedOptions.map((value) => ({ value, key: value }))}
    />
  );
};
