import React, { useState } from 'react';
import styled from 'styled-components';
import { Input, Icon } from 'antd';

import Drawer from './Drawer/Drawer';

const StyledWrapper = styled.div`
  width: 100vw;
  height: 100vh;
`;

const StyledMenu = styled.div`
  width: 100%;
  padding: 8px;
  display: flex;
  flex-direction: row;
  box-shadow: 0px 1px 8px #dedede;
`;

const StyledIcon = styled(Icon)`
  padding: 10px 15px 10px 10px;
`;

export default ({ children }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(true);

  return (
    <StyledWrapper>
      <StyledMenu>
        <StyledIcon type="menu" onClick={() => setIsDrawerOpen(!isDrawerOpen)} />
        <Drawer isVisible={isDrawerOpen} onCloseDrawer={() => setIsDrawerOpen(false)} />
        <Input.Search placeholder="Search for something" />
      </StyledMenu>
      {children}
    </StyledWrapper>
  );
};
