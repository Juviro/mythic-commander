import React from 'react';
import { Affix, Menu } from 'antd';
import styled from 'styled-components';

const StyledMenuItem = styled(Menu.Item)`
  flex-grow: 1;
  display: flex !important;
  justify-content: center;
`;

export default ({ onSetTab, currentTab }) => {
  return (
    <Affix offsetTop={50} style={{ width: '100%', zIndex: 200 }}>
      <Menu selectedKeys={[currentTab]} mode="horizontal" style={{ display: 'flex' }}>
        <StyledMenuItem key="cards" onClick={() => onSetTab('cards')}>
          Cards
        </StyledMenuItem>
        <StyledMenuItem key="wants" onClick={() => onSetTab('wants')}>
          Wants
        </StyledMenuItem>
        <StyledMenuItem key="edit" onClick={() => onSetTab('edit')}>
          Edit
        </StyledMenuItem>
      </Menu>
    </Affix>
  );
};
