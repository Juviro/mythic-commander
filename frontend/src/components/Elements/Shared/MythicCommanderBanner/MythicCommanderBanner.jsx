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

const StyledText = styled(Typography.Text)`
  color: rgba(255, 255, 255, 0.8);
  margin-left: 16px;
  white-space: nowrap;

  /* @media only screen and (max-width: 1000px) {
    display: none;
  } */
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
      <StyledText style={{ fontSize }}>Mythic Commander</StyledText>
    </StyledWrapper>
  );
};
export default withRouter(MythicCommanderBanner);
