import React from 'react';
import styled from 'styled-components';

import { Typography } from 'antd';
import { withRouter } from 'react-router';
import icon from '../../../../assets/icons/favicon.ico';

const StyledWrapper = styled.div`
  display: flex;
  align-items: center;
  height: 32px;
`;

const StyledIcon = styled.img`
  height: 100%;
`;

const MythicCommanderBanner = ({
  fontSize = 20,
  style,
  showCollectionOnClick,
  history,
}) => {
  const navigateToCollection = () => history.push('/collection');
  return (
    <StyledWrapper
      style={{ ...style, cursor: showCollectionOnClick && 'pointer' }}
      onClick={showCollectionOnClick && navigateToCollection}
    >
      <StyledIcon src={icon} />
      <Typography.Text
        style={{ fontSize, color: 'rgba(255, 255, 255, 0.8)', marginLeft: 16 }}
      >
        Mythic Commander
      </Typography.Text>
    </StyledWrapper>
  );
};
export default withRouter(MythicCommanderBanner);
