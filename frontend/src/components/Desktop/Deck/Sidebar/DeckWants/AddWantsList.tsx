import React from 'react';
import { Space, Typography } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { useMutation } from 'react-apollo';
import { useParams } from 'react-router';
import styled from 'styled-components';

import { primary } from 'constants/colors';
import { MutationCreateWantsListArgs } from 'types/graphql';
import { useToggle } from 'components/Hooks';
import { createLinkedWantsList, wantsListsForDeck } from './queries';

const StyledWrapper = styled.div`
  display: flex;
  padding: 8px;
  align-items: center;
  flex-direction: row;
  cursor: pointer;
  width: 100%;
  font-size: 16px;
  color: ${primary};
`;

export default () => {
  const { id: deckId } = useParams<{ id: string }>();
  const [mutate] = useMutation<any, MutationCreateWantsListArgs>(createLinkedWantsList);
  const [isCreating, toggleIsCreating] = useToggle();

  const onCreateList = async () => {
    if (isCreating) return;
    toggleIsCreating(true);
    await mutate({
      variables: { deckId },
      update: (cache, { data: { createWantsList } }) => {
        const existing = cache.readQuery<any>({
          query: wantsListsForDeck,
          variables: { deckId },
        });

        cache.writeQuery({
          query: wantsListsForDeck,
          variables: { deckId },
          data: {
            wantsLists: [...existing.wantsLists, createWantsList],
          },
        });
      },
    });
    toggleIsCreating(false);
  };

  return (
    <StyledWrapper onClick={onCreateList}>
      <Space>
        {isCreating ? <LoadingOutlined /> : <PlusOutlined />}
        <Typography.Text strong style={{ color: primary }}>
          Add a new list
        </Typography.Text>
      </Space>
    </StyledWrapper>
  );
};
