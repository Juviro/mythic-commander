import React from 'react';
import { Spin, Typography } from 'antd';
import styled from 'styled-components';
import { useQuery } from '@apollo/react-hooks';

import { getUser } from './queries';
import Flex from '../Flex';

const StyledWrapper = styled.div`
  height: 30px;
  display: flex;
  align-items: center;
`;

const StyledAvatar = styled.img`
  height: 100%;
  border-radius: 50%;
  cursor: pointer;
  font-size: 8px;
`;

const StyledUsername = styled(Typography.Text)`
  font-size: 16px;
  line-height: 1;
`;

export default ({ showName, onClick }) => {
  const { data, loading } = useQuery(getUser);

  return (
    <StyledWrapper onClick={onClick}>
      {loading ? (
        <Spin />
      ) : (
        <>
          <StyledAvatar src={data.user.avatar} alt="avatar" />
          {showName && (
            <Flex direction="column" style={{ marginLeft: 16, maxWidth: 190 }}>
              <Typography.Text type="secondary" style={{ fontSize: 10 }}>
                Logged in as
              </Typography.Text>
              <StyledUsername ellipsis>{data.user.name}</StyledUsername>
            </Flex>
          )}
        </>
      )}
    </StyledWrapper>
  );
};
