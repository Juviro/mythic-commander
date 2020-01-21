import React from 'react';
import styled from 'styled-components';
import { useQuery } from 'react-apollo';
import UserAvatar from '../../../Elements/UserAvatar';
import { getUser } from '../../../../queries';

const StyledHeader = styled.div`
  width: 100%;
  height: 20px;
  display: flex;
  align-items: center;
  flex-direction: row;
`;

const StyledUsername = styled.div`
  margin-left: 16px;
  font-size: 14px;
`;

export default () => {
  const { data, loading } = useQuery(getUser);
  return (
    <StyledHeader>
      <UserAvatar />
      {!loading && data && <StyledUsername>{data.user.name}</StyledUsername>}
    </StyledHeader>
  );
};
