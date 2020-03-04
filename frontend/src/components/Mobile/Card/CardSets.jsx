import React from 'react';
import styled from 'styled-components';
import { Skeleton } from 'antd';

import { SetPicker } from '../../Elements';

const StyledSetWrapper = styled.div`
  display: flex;
  width: 100%;
  ${({ isLoading }) => (isLoading ? '' : 'margin-top: 16px;')}
  align-items: center;
`;

export default ({ card, loading, cardId, onChangeSet }) => {
  return (
    <StyledSetWrapper isLoading={loading}>
      {loading || !cardId ? (
        <Skeleton active paragraph={null} />
      ) : (
        <SetPicker card={card} onClick={onChangeSet} defaultCardId={cardId} />
      )}
    </StyledSetWrapper>
  );
};
