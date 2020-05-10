import React from 'react';
import styled, { css } from 'styled-components';

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

const StyledTextWrapper = styled.span`
  margin-left: 16px;
  white-space: nowrap;

  ${({ hideWhenSmall }) =>
    hideWhenSmall
      ? css`
          @media only screen and (max-width: 900px) {
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
      <StyledIcon src={icon} />
      <StyledTextWrapper hideWhenSmall={hideWhenSmall}>
        <Typography.Text
          style={{ fontSize, color: 'rgba(255, 255, 255, 0.8)' }}
        >
          Mythic Commander
        </Typography.Text>
      </StyledTextWrapper>
    </StyledWrapper>
  );
};
export default withRouter(MythicCommanderBanner);
