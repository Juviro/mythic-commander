import React from 'react';
import styled, { css } from 'styled-components';

import { Typography } from 'antd';
import { withRouter } from 'react-router';

const StyledWrapper = styled.div`
  display: flex;
  align-items: center;
  height: 32px;
`;

const StyledIcon = styled.img`
  width: 32px;
  height: 32px;
`;

const StyledTextWrapper = styled.span`
  margin-left: 16px;
  white-space: nowrap;

  ${({ hideWhenSmall }) =>
    hideWhenSmall
      ? css`
          @media only screen and (max-width: 1200px) {
            display: none;
          }
        `
      : ''}
`;

const MythicCommanderBanner = ({
  fontSize = 20,
  style,
  showCollectionOnClick,
  history,
  hideWhenSmall,
}) => {
  const navigateToCollection = () => history.push('/collection');

  return (
    <StyledWrapper
      style={{ ...style, cursor: showCollectionOnClick && 'pointer' }}
      onClick={showCollectionOnClick && navigateToCollection}
    >
      <StyledIcon src="/favicon.svg" alt="mythic-commander-logo" />
      <StyledTextWrapper hideWhenSmall={hideWhenSmall}>
        <Typography.Text style={{ fontSize, color: 'rgba(255, 255, 255, 0.8)' }}>
          Mythic Commander
        </Typography.Text>
      </StyledTextWrapper>
    </StyledWrapper>
  );
};
export default withRouter(MythicCommanderBanner);
