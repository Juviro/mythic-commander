import React from 'react';
import { Affix, Menu } from 'antd';

import styled from 'styled-components';

const StyledMenu = styled(Menu)`
  & .ant-menu-item {
    flex: 1;
    justify-content: center;
    display: flex;
    padding: 0;
  }
`;

const DeckMenu = ({ onSetTab, currentTab }) => {
  const items = [
    {
      key: 'cards',
      label: 'Cards',
      onClick: () => onSetTab('cards'),
    },
    {
      key: 'wants',
      label: 'Wants',
      onClick: () => onSetTab('wants'),
    },
    {
      key: 'edit',
      label: 'Edit',
      onClick: () => onSetTab('edit'),
    },
  ];

  return (
    <Affix offsetTop={50} style={{ width: '100%', zIndex: 200 }}>
      <StyledMenu
        selectedKeys={[currentTab]}
        mode="horizontal"
        style={{ display: 'flex' }}
        items={items}
      />
    </Affix>
  );
};

export default DeckMenu;
