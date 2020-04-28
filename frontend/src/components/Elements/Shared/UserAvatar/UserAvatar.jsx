import React from 'react';
import { Spin, Typography } from 'antd';
import styled from 'styled-components';
import { useQuery } from '@apollo/react-hooks';

import { getUser } from '../../../../queries';

const StyledWrapper = styled.div`
  height: 30px;
  display: flex;
  align-items: center;
`;

const StyledAvatar = styled.img`
  height: ${({ isSmall }) => (isSmall ? 80 : 100)}%;
  border-radius: 50%;
  cursor: pointer;
  font-size: 8px;
`;

const StyledUsername = styled(Typography.Text)`
  font-size: 16px;
  margin-left: 8px;
  max-width: 120px;
`;

export default ({ showName }) => {
  const { data, loading } = useQuery(getUser);

  return (
    <StyledWrapper>
      {loading ? (
        <Spin />
      ) : (
        <>
          <StyledAvatar
            src={data.user.avatar}
            alt="avatar"
            isSmall={showName}
          />
          {showName && (
            <StyledUsername ellipsis>{data.user.name}</StyledUsername>
          )}
        </>
      )}
    </StyledWrapper>
  );
};
