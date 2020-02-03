import React from 'react';
import { Spin } from 'antd';
import styled from 'styled-components';
import { useQuery } from 'react-apollo';

import { getCollection } from '../../../queries';
import CollectionList from './CollectionList';

const StyledWrapper = styled.div`
  width: 100%;
  display: flex;
  min-height: 100px;
  align-items: center;
  flex-direction: column;
  justify-content: center;
`;

export default () => {
  const { data, loading } = useQuery(getCollection);
  return (
    <StyledWrapper>
      {loading ? <Spin /> : <CollectionList cards={data.collection.cards} />}
    </StyledWrapper>
  );
};
