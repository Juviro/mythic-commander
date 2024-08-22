import React from 'react';
import styled from 'styled-components';

import FriendsList from 'components/Elements/Shared/FriendsList/FriendsList';

const StyledWrapper = styled.div`
  padding: 16px;
`;

const StyledTitle = styled.h1`
  font-size: 24px;
  font-weight: 400;
  margin: 0 0 16px;
`;

const Friends = () => {
  return (
    <StyledWrapper>
      <StyledTitle>Your Friends</StyledTitle>
      <FriendsList />
    </StyledWrapper>
  );
};

export default Friends;
