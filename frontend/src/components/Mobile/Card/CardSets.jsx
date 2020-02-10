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

const CardSets = ({ card, loading, history, set }) => {
  const [{ query: searchQuery = '' }] = useQueryParams({
    query: StringParam,
  });

  const onSelectSet = id => {
    const newCard = card.all_sets.find(({ id: cardId }) => id === cardId);
    if (!newCard) return;
    history.replace(
      `/m/cards/${card.oracle_id}/${newCard.set}${
        searchQuery ? `?query=${searchQuery}` : ''
      }`
    );
  };

  return (
    <StyledSetWrapper isLoading={loading}>
      {loading || !set ? (
        <Skeleton active paragraph={null} />
      ) : (
        <SetPicker card={card} onClick={onSelectSet} defaultSet={set} />
      )}
    </StyledSetWrapper>
  );
};

export default withRouter(CardSets);
