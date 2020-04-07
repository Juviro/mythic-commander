import React from 'react';
import { Spin } from 'antd';
import styled from 'styled-components';
import { useQuery } from '@apollo/react-hooks';

import { getUser } from '../../../../queries';

const StyledWrapper = styled.div`
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledAvatar = styled.img`
  width: 100%;
  border-radius: 50%;
  cursor: pointer;
  font-size: 8px;
`;

export default () => {
  const { data, loading } = useQuery(getUser);

  return (
    <StyledWrapper>
      {loading ? (
        <Spin />
      ) : (
        <StyledAvatar src={data.user.avatar} alt="avatar" />
      )}
    </StyledWrapper>
  );
};
