import React from 'react';
import { Affix, Menu } from 'antd';
import styled from 'styled-components';
import { withRouter } from 'react-router';

const StyledHeader = styled.div`
  width: 100%;
`;

const StyledMenuItem = styled(Menu.Item)`
  width: 33.33%;
  display: flex !important;
  justify-content: center;
`;

const DeckList = ({ deck }) => {
  return (
    <StyledHeader>
      <Affix offsetTop={50}>
        <Menu defaultSelectedKeys="cards" mode="horizontal" style={{ display: 'flex' }}>
          <StyledMenuItem key="cards">Cards</StyledMenuItem>
          <StyledMenuItem key="stats">Stats</StyledMenuItem>
          <StyledMenuItem key="edit">Edit</StyledMenuItem>
        </Menu>
      </Affix>
    </StyledHeader>
  );
};

export default withRouter(DeckList);
