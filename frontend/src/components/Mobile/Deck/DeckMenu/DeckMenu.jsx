import React from 'react';
import { Affix, Menu } from 'antd';
import styled from 'styled-components';
import { withRouter } from 'react-router';

const StyledMenuItem = styled(Menu.Item)`
  width: 33.33%;
  display: flex !important;
  justify-content: center;
`;

const DeckList = ({ deck }) => {
  return (
    <Affix offsetTop={50} style={{ width: '100%' }}>
      <Menu defaultSelectedKeys="cards" mode="horizontal" style={{ display: 'flex' }}>
        <StyledMenuItem key="cards">Cards</StyledMenuItem>
        <StyledMenuItem key="stats">Stats</StyledMenuItem>
        <StyledMenuItem key="edit">Edit</StyledMenuItem>
      </Menu>
    </Affix>
  );
};

export default withRouter(DeckList);
