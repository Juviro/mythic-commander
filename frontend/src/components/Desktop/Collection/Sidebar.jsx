import React from 'react';
import styled from 'styled-components';
import { Divider, Tooltip } from 'antd';
import { DoubleLeftOutlined, DoubleRightOutlined } from '@ant-design/icons';

import AddToCollection from './AddToCollection';
import { CollectionOverview, CollectionCharts } from '../../Elements';
import { useShortcut } from '../../Hooks';

const StyledWrapper = styled.div`
  width: 400px;
  height: 100%;
  font-size: 16px;
  padding: 24px;
  position: relative;
  transition: all 0.2s;
  box-shadow: ${({ isVisible }) =>
    isVisible ? '5px 0 5px -5px #333' : 'none'};
  margin-left: ${({ isVisible }) => (isVisible ? 0 : '-400')}px;
`;

const StyledToggleWrapper = styled.div`
  top: 56px;
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

export default ({ cards, isVisible, setIsVisible }) => {
  useShortcut('s', () => setIsVisible(!isVisible));

  return (
    <StyledWrapper isVisible={isVisible}>
      <Tooltip title="Toggle Sidebar [S]" placement="right">
        <StyledToggleWrapper onClick={() => setIsVisible(!isVisible)}>
          {isVisible ? <DoubleLeftOutlined /> : <DoubleRightOutlined />}
        </StyledToggleWrapper>
      </Tooltip>
      {isVisible && (
        <>
          <Divider>Overview</Divider>
          <CollectionOverview cards={cards} size="large" column={1} />
          <Divider>Add cards</Divider>
          <AddToCollection />
          <Divider>History</Divider>
          <CollectionCharts />
        </>
      )}
    </StyledWrapper>
  );
};
