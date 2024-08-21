import React, { useContext } from 'react';
import { Badge, Spin, Typography } from 'antd';
import styled from 'styled-components';

import UserContext from 'components/Provider/UserProvider';
import Flex from '../Flex';
import LoginButton from '../Login/LoginButton';

const StyledWrapper = styled.div`
  height: 30px;
  display: flex;
  cursor: pointer;
  align-items: center;

  @media only screen and (max-width: 1400px) {
    & .username {
      display: none;
    }
  }
`;

const StyledAvatar = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  cursor: pointer;
  font-size: 8px;
`;

const UserAvatar = ({ textPosition, onClick, textColor }) => {
  const { user, loading } = useContext(UserContext);
  if (loading) return null;

  if (!user) {
    return <LoginButton />;
  }

  const username = user.username ?? user.name;

  return (
    <StyledWrapper onClick={onClick}>
      {loading ? (
        <Spin />
      ) : (
        <>
          {textPosition === 'left' && (
            <Typography.Text
              ellipsis
              className="username"
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
          <Badge
            count={textPosition === 'left' ? user.openFriendRequests : 0}
            size="small"
            style={{ transform: 'translate(30%, -30%)' }}
          >
            <StyledAvatar src={user.avatar} alt="avatar" />
          </Badge>
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

export default UserAvatar;
