import React from 'react';
import { Button, Typography } from 'antd';
import styled from 'styled-components';

export const CARDS_PER_PAGE = 30;

const StyledButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
`;

export default ({
  hasMore,
  loading,
  onLoadMore,
  displayedCards,
  totalResults,
}) => (
  <StyledButtonWrapper>
    {hasMore && (
      <Button type="link" onClick={onLoadMore} loading={loading}>
        Load more
      </Button>
    )}
    <Typography.Text
      style={{ marginTop: 8 }}
      type="secondary"
    >{`Displaying ${displayedCards} of ${totalResults} cards`}</Typography.Text>
  </StyledButtonWrapper>
);
