import { LoadingOutlined } from '@ant-design/icons';
import { Button, Space } from 'antd';
import React from 'react';
import styled from 'styled-components';
import { EdhRecCategory } from 'types/graphql';

const StyledWrapper = styled(Space)`
  width: 100%;
`;

const StyledLoadingWrapper = styled.div`
  min-height: 500px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledButton = styled(Button)`
  width: 100%;
  display: flex;
  justify-content: flex-start;
`;

interface Props {
  lists?: EdhRecCategory[];
  categoryKey: string | null;
  setCategoryKey: (key: string) => void;
  loading: boolean;
}

export const CategorySelection = ({
  lists,
  categoryKey,
  setCategoryKey,
  loading,
}: Props) => {
  if (!lists || loading)
    return (
      <StyledLoadingWrapper>
        <LoadingOutlined />
      </StyledLoadingWrapper>
    );

  return (
    <StyledWrapper direction="vertical">
      {lists.map(({ key, title, cards }) => (
        <StyledButton
          key={key}
          type={key === categoryKey ? 'primary' : 'link'}
          ghost={key === categoryKey}
          onClick={() => setCategoryKey(key)}
        >
          {`${title} (${cards.length})`}
        </StyledButton>
      ))}
    </StyledWrapper>
  );
};
