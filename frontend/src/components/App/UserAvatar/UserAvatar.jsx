import React from 'react';
import { Tooltip, Spin } from 'antd';
import styled from 'styled-components';
import { useQuery } from '@apollo/react-hooks';

import { getUser } from '../../../queries';

const StyledWrapper = styled.div`
  width: 30px;
  height: 30px;
  margin-right: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledAvatar = styled.img`
  border-radius: 50%;
  width: 100%;
  height: 100%;
  cursor: pointer;
`;

export default () => {
  const { data, loading } = useQuery(getUser);

  const logOut = () => {
    window.localStorage.setItem('sessionId', null);
    window.location.href = '/login';
  };

  return (
    <Tooltip title="logout" placement="rightBottom">
      <StyledWrapper>
        {loading ? <Spin /> : <StyledAvatar src={data.user.avatar} alt="profile image" onClick={logOut} />}
      </StyledWrapper>
    </Tooltip>
  );
};
