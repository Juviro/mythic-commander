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

export default ({ textPosition, onClick, textColor }) => {
  const { data, loading } = useQuery(getUser);

  const username = data && (data.user.username || data.user.name);

  return (
    <StyledWrapper onClick={onClick}>
      {loading ? (
        <Spin />
      ) : (
        <>
          {textPosition === 'left' && (
            <Typography.Text
              ellipsis
              style={{
                color: textColor,
                fontSize: 16,
                marginRight: 8,
                maxWidth: 100,
              }}
            >
              {username}
            </Typography.Text>
          )}
          <StyledAvatar src={data.user.avatar} alt="avatar" />
          {textPosition === 'right' && (
            <Flex
              direction="column"
              style={{ marginLeft: 16, maxWidth: 190, minWidth: 100 }}
            >
              <Typography.Text
                type="secondary"
                style={{ fontSize: 12, color: textColor }}
              >
                Logged in as
              </Typography.Text>
              <Typography.Text
                ellipsis
                style={{ color: textColor, lineHeight: 1, fontSize: 16 }}
              >
                {username}
              </Typography.Text>
            </Flex>
          )}
        </>
      )}
    </StyledWrapper>
  );
};
