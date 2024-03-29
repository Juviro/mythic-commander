import React from 'react';
import styled from 'styled-components';
import { Tooltip, Skeleton } from 'antd';
import { DoubleLeftOutlined, DoubleRightOutlined } from '@ant-design/icons';
import { useShortcut } from '../../../Hooks';

const StyledWrapper = styled.div`
  width: ${({ width }) => width};
  height: 100%;
  font-size: 16px;
  padding: 24px;
  position: relative;
  transition: all 0.2s;
  will-change: margin-left;
  box-shadow: ${({ isVisible }) => (isVisible ? '5px 0 5px -5px #333' : 'none')};
  margin-left: ${({ isVisible, marginLeft }) => (isVisible ? 0 : -marginLeft)}px;
`;

const StyledToggleWrapper = styled.div`
  top: 110px;
  z-index: 99;
  right: -33px;
  cursor: pointer;
  position: absolute;
  background-color: #b1b1b1;
  padding: 6px 10px 6px 6px;
  opacity: 0.5;
  transition: all 0.2s;

  box-shadow: 5px 0 5px -5px #333;
  border-top-right-radius: 50%;
  border-bottom-right-radius: 50%;

  &:hover {
    opacity: 1;
  }
`;

export default ({
  children,
  isVisible,
  toggleIsVisible,
  width = 300,
  wrapperStyle,
  isFullscreen,
  loading,
}) => {
  useShortcut('s', toggleIsVisible);
  const sidebarWidth = isFullscreen ? '100%' : `${width}px`;

  return (
    <StyledWrapper
      isVisible={isVisible}
      marginLeft={width}
      width={sidebarWidth}
      style={wrapperStyle}
    >
      {!isFullscreen && (
        <Tooltip title="Toggle Sidebar [S]" placement="right">
          <StyledToggleWrapper onClick={toggleIsVisible}>
            {isVisible ? <DoubleLeftOutlined /> : <DoubleRightOutlined />}
          </StyledToggleWrapper>
        </Tooltip>
      )}
      {isVisible && (loading ? <Skeleton /> : children)}
    </StyledWrapper>
  );
};
