import styled from 'styled-components';
import { useMutation } from 'react-apollo';
import { Input, Space, Button } from 'antd';
import React, { useRef, useState } from 'react';

import { FEATURE_FLAG_TAG } from 'constants/featureFlags';
import DEFAULT_TAGS from 'constants/tags';
import { UnifiedDeckCard } from 'types/unifiedTypes';
import { MutationSetDefaultTagArgs } from 'types/graphql';
import { Tag } from './Tag';
import Flex from '../../Flex';
import { FeatureFlag } from '../..';
import { setDefaultTag } from './queries';

const StyledMenu = styled.div`
  display: flex;
  flex-direction: column;
  width: 250px;
  height: 200px;
`;

const StyledTags = styled.div`
  overflow: auto;
  max-height: 120px;
  margin-bottom: 8px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

interface Props {
  onSetTags: (cardId: string, tags: string[]) => void;
  card: UnifiedDeckCard;
  allTags: string[];
}

export const AddTag = ({ onSetTags, card, allTags }: Props) => {
  const inputRef = useRef(null);
  const [search, setSearch] = useState<string>('');
  const [mutate] = useMutation<null, MutationSetDefaultTagArgs>(setDefaultTag);

  const existingTags = [...new Set(allTags.concat(DEFAULT_TAGS))];
  const displayedTags = existingTags.filter(
    (tag) => !card.tags?.includes(tag) && tag.toLowerCase().includes(search.toLowerCase())
  );

  const onAddTag = (tag: string, saveAsDefault?: boolean) => {
    const currentTags = card.tags ?? [];
    const usedTag =
      existingTags.find((existing) => existing.toLowerCase() === tag.toLowerCase()) ??
      tag;

    const newTags = [...new Set(currentTags.concat(usedTag))].sort((a, b) =>
      a.toLowerCase() > b.toLowerCase() ? 1 : -1
    );

    onSetTags(card.id, newTags);
    setSearch('');

    if (saveAsDefault) {
      mutate({ variables: { tag, oracleId: card.oracle_id } });
    }
  };

  const onSubmit = () => onAddTag(search);

  return (
    <StyledMenu>
      <Flex direction="column" justify="space-between" style={{ height: '100%' }}>
        <Space direction="vertical">
          <Input
            autoFocus
            allowClear
            ref={inputRef}
            placeholder="Enter your tag"
            style={{ width: '100%' }}
            onSubmit={onSubmit}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(event) => {
              if (event.key !== 'Enter') return;
              onSubmit();
            }}
            value={search}
          />
          <StyledTags>
            {displayedTags.map((tag) => (
              <Tag tag={tag} key={tag} onClick={() => setSearch(tag)} />
            ))}
          </StyledTags>
        </Space>
        <Flex justify="flex-end">
          <Space>
            <FeatureFlag flag={FEATURE_FLAG_TAG}>
              <Button
                type="primary"
                ghost
                onClick={() => onAddTag(search, true)}
                disabled={
                  !search ||
                  !DEFAULT_TAGS.some((tag) => tag.toLowerCase() === search.toLowerCase())
                }
              >
                Save as default
              </Button>
            </FeatureFlag>
            <Button type="primary" disabled={!search.trim()} onClick={onSubmit}>
              Save
            </Button>
          </Space>
        </Flex>
      </Flex>
    </StyledMenu>
  );
};
