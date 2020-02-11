import React from 'react';
import styled from 'styled-components';
import { Skeleton } from 'antd';
import { withRouter } from 'react-router';
import { useQueryParams, StringParam } from 'use-query-params';

import SetPicker from '../../Elements/SetPicker/SetPicker';

const StyledSetWrapper = styled.div`
  display: flex;
  width: 100%;
  ${({ isLoading }) => (isLoading ? '' : 'margin-top: 16px;')}
  align-items: center;
`;

const CardSets = ({ card, loading, history, cardId }) => {
  const [{ query: searchQuery = '' }] = useQueryParams({
    query: StringParam,
  });

  const onSelectSet = id => {
    history.replace(
      `/m/cards/${card.oracle_id}/${id}${
        searchQuery ? `?query=${searchQuery}` : ''
      }`
    );
  };

  return (
    <StyledSetWrapper isLoading={loading}>
      {loading || !cardId ? (
        <Skeleton active paragraph={null} />
      ) : (
        <SetPicker card={card} onClick={onSelectSet} defaultCardId={cardId} />
      )}
    </StyledSetWrapper>
  );
};

export default withRouter(CardSets);
