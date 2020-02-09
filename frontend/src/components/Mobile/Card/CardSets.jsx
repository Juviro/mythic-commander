import React, { useContext } from 'react';
import styled from 'styled-components';
import { Skeleton } from 'antd';
import { withRouter } from 'react-router';
import { useQueryParams, StringParam } from 'use-query-params';

import CardContext from '../../CardProvider/CardProvider';
import SetPicker from '../../Elements/SetPicker/SetPicker';

const StyledSetWrapper = styled.div`
  display: flex;
  width: 100%;
  ${({ isLoading }) => (isLoading ? '' : 'margin-top: 16px;')}
  align-items: center;
`;

const CardSets = ({ card, loading, history }) => {
  const [{ query: searchQuery = '' }] = useQueryParams({
    query: StringParam,
  });
  const { sets } = useContext(CardContext);
  if (!card || !sets) return null;

  const onSelectSet = id => {
    history.replace(
      `/m/cards/${id}${searchQuery ? `?query=${searchQuery}` : ''}`
    );
  };

  return (
    <StyledSetWrapper isLoading={loading}>
      {loading ? (
        <Skeleton active paragraph={null} />
      ) : (
        <SetPicker card={card} onClick={onSelectSet} />
      )}
    </StyledSetWrapper>
  );
};

export default withRouter(CardSets);
