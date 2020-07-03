import React from 'react';
import { Typography } from 'antd';
import styled from 'styled-components';
import { LoadingOutlined } from '@ant-design/icons';

const StyledButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  margin-bottom: 24px;
`;

export default ({ loading, displayedCards, totalResults }) => {
  const showTotalResultsLabel = !loading || totalResults;
  const totalResultsLabel = `Displaying ${displayedCards} of ${totalResults} cards`;

  return (
    <StyledButtonWrapper>
      {loading && <LoadingOutlined />}
      {Boolean(showTotalResultsLabel) && (
        <Typography.Text style={{ marginTop: 8 }} type="secondary">
          {totalResultsLabel}
        </Typography.Text>
      )}
    </StyledButtonWrapper>
  );
};
