import React from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router';
import { useQuery } from 'react-apollo';
import { getDeck } from '../../../queries/deck';
import LeftSidebar from './LeftSidebar';

const StyledPreview = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: row;
  height: calc(100% - 49px);
  font-size: 17px;
  font-weight: 900;
`;

export default () => {
  const { id } = useParams();
  const { data, loading } = useQuery(getDeck, { variables: { id } });
  console.log('id :', id, data, loading);

  return (
    <StyledPreview>
      <LeftSidebar />
      <div style={{ width: '100%' }}>Decklist</div>
    </StyledPreview>
  );
};
